package hu.flowacademy.konyhatunder.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.enums.Difficulty;
import hu.flowacademy.konyhatunder.enums.Measurement;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.model.Image;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final AmountOfIngredientRepository amountOfIngredientRepository;
    private final ImageStorageService imageStorageService;

    public List<Recipe> listRecipes() {
        List<Recipe> allRecipes = recipeRepository.findAll();
        log.debug("Get all {} recipes in RecipeService",allRecipes.size());
        return allRecipes;
    }

    public Recipe getRecipe(String id) {
        log.debug("Get a recipe with this id: {} in RecipeService",id);
        return recipeRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkező recept!"));
    }

    public Recipe createRecipe(String stringRecipe, MultipartFile image) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        RecipeDTO recipeDTO = mapper.readValue(stringRecipe, RecipeDTO.class);

        validate(recipeDTO);

        Image imageFile = imageStorageService.storeFile(image);
        List<Category> categoryList = recipeDTO.getCategories().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(recipeDTO.getName())
                .description(recipeDTO.getDescription())
                .difficulty(translateDifficulty(recipeDTO.getDifficulty()))
                .image(imageFile)
                .preparationTime(recipeDTO.getPreparationTime())
                .categories(categoryList)
                .build());

        List<AmountOfIngredient> amountOfIngredientList = new ArrayList<>();

        recipeDTO.getIngredients().forEach(element -> {
            AmountOfIngredient amountOfIng = AmountOfIngredient.builder()
                    .unit(translateUnit(element.getIngredient().getMeasurement(), element.getUnit()))
                    .amount(element.getAmount())
                    .recipe(savedRecipe)
                    .ingredient(element.getIngredient())
                    .build();
            amountOfIngredientRepository.save(amountOfIng);

            amountOfIngredientList.add(amountOfIng);

        });
        savedRecipe.setIngredients(amountOfIngredientList);
        return recipeRepository.save(savedRecipe);
    }

    private String translateUnit(Measurement measurement, String unit) {
        switch(measurement.getHungarianTranslation()){
            case "Bögre" :
               return Arrays.stream(MeasurementCup.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            case "Kilogramm" :
                return Arrays.stream(MeasurementKilogram.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            case "Liter" :
                return Arrays.stream(MeasurementLiter.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            case "Darab" :
                return Arrays.stream(MeasurementPiece.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            case "Kanál" :
                return Arrays.stream(MeasurementSpoon.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            case "Egyéb" :
                return Arrays.stream(MeasurementOther.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
            default : throw new ValidationException("Nem megfelelő alapegység!");
        }
    }

    public List<String> listRecipeDifficulty() {
        return Arrays.stream(Difficulty.values()).map(Difficulty::getHungarianTranslation).collect(Collectors.toList());
    }

    private Difficulty translateDifficulty(String difficulty) {
        if (Difficulty.EASY.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.EASY;
        } else if (Difficulty.MEDIUM.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.MEDIUM;
        } else if (Difficulty.HARD.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.HARD;
        } else {
            throw new ValidationException("Nem megfelelő nehézségi szint!");
        }

    }

    @SneakyThrows
    private void validate(RecipeDTO recipeDTO) {
        if (!StringUtils.hasText(recipeDTO.getName()))
            throw new ValidationException("A recept nevét kötelező megadni!");

        if (!StringUtils.hasText(recipeDTO.getDescription()))
            throw new ValidationException("A leírás mező nem lehet üres!");

        if (recipeDTO.getPreparationTime() <= 0)
            throw new ValidationException("Az elkészítési idő nem lehet 0 vagy annál kisebb!");

        if (recipeDTO.getDifficulty() == null)
            throw new ValidationException("Nehézségi szint megadása kötelező!");

        if (CollectionUtils.isEmpty(recipeDTO.getIngredients())) {
            throw new ValidationException("Hozzávalók megadása kötelező!");
        }
    }
}

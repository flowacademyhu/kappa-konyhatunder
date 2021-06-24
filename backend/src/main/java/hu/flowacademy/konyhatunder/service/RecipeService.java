package hu.flowacademy.konyhatunder.service;


import com.google.gson.Gson;
import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.enums.Measurement;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.enums.Difficulty;
import hu.flowacademy.konyhatunder.model.Image;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final AmountOfIngredientForARecipeRepository amountOfIngredientForARecipeRepository;
    private final ImageStorageService imageStorageService;

    public List<Recipe> listRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipe(String id) {
        return recipeRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkező recept!"));
    }

    public Recipe createRecipe(String stringRecipe, MultipartFile image) {
        Gson jsonMaker = new Gson();
        RecipeDTO recipeDTO = jsonMaker.fromJson(stringRecipe, RecipeDTO.class);
        validate(recipeDTO);

        Image imageFile = imageStorageService.storeFile(image);
        List<Category> categoryList = recipeDTO.getCategories().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(recipeDTO.getName())
                .description(recipeDTO.getDescription())
                .difficulty(translateLevel(recipeDTO.getDifficulty()))
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
            amountOfIngredientForARecipeRepository.save(amountOfIng);

            amountOfIngredientList.add(amountOfIng);

        });
        savedRecipe.setIngredients(amountOfIngredientList);
        return recipeRepository.save(savedRecipe);
    }

    //TODO
    private String translateUnit(Measurement type, String unit) {
        return null;
    }

    public List<String> listRecipeLevels() {
        return Arrays.stream(Difficulty.values()).map(Difficulty::getHungarianTranslation).collect(Collectors.toList());
    }

    private Difficulty translateLevel(String level) {
        if (Difficulty.EASY.getHungarianTranslation().equals(level)) {
            return Difficulty.EASY;
        } else if (Difficulty.MEDIUM.getHungarianTranslation().equals(level)) {
            return Difficulty.MEDIUM;
        } else if (Difficulty.HARD.getHungarianTranslation().equals(level)) {
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

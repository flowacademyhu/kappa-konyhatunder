package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

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

    public List<Recipe> listRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipe(String id) {
        return recipeRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkező recept!"));
    }

    public Recipe createRecipe(RecipeDTO recipeDTO) {
        validate(recipeDTO);
        List<Category> categoryList = recipeDTO.getCategories().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(recipeDTO.getName())
                .description(recipeDTO.getDescription())
                .difficulty(translateLevel(recipeDTO.getDifficulty()))
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
            default:
                return Arrays.stream(MeasurementOther.values()).filter(u -> u.getHungarianTranslation().equals(unit)).collect(Collectors.toList()).get(0).toString();
        }
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

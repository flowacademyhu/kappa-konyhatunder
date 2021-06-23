package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.enums.Type;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.enums.Level;
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
        List<Category> categoryList = recipeDTO.getCategoryList().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(recipeDTO.getName())
                .description(recipeDTO.getDescription())
                .level(translateLevel(recipeDTO.getLevel()))
                .preparationTime(recipeDTO.getPreparationTime())
                .categoryList(categoryList)
                .build());

        List<AmountOfIngredient> amountOfIngredientList = new ArrayList<>();

        recipeDTO.getAmountOfIngredientList().forEach(element -> {
            AmountOfIngredient amountOfIng = AmountOfIngredient.builder()
                    .unit(translateUnit(element.getIngredient().getType(), element.getUnit()))
                    .amount(element.getAmount())
                    .recipe(savedRecipe)
                    .ingredient(element.getIngredient())
                    .build();
            amountOfIngredientForARecipeRepository.save(amountOfIng);

            amountOfIngredientList.add(amountOfIng);

        });
        savedRecipe.setAmountOfIngredientList(amountOfIngredientList);
        return recipeRepository.save(savedRecipe);
    }

    //TODO
    private String translateUnit(Type type, String unit) {
        return null;
    }

    public List<String> listRecipeLevels() {
        return Arrays.stream(Level.values()).map(Level::getHungarianTranslation).collect(Collectors.toList());
    }

    private Level translateLevel(String level) {
        if (Level.EASY.getHungarianTranslation().equals(level)) {
            return Level.EASY;
        } else if (Level.MEDIUM.getHungarianTranslation().equals(level)) {
            return Level.MEDIUM;
        } else if (Level.HARD.getHungarianTranslation().equals(level)) {
            return Level.HARD;
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

        if (recipeDTO.getLevel() == null)
            throw new ValidationException("Nehézségi szint megadása kötelező!");

        if (CollectionUtils.isEmpty(recipeDTO.getAmountOfIngredientList())) {
            throw new ValidationException("Hozzávalók megadása kötelező!");
        }
    }
}

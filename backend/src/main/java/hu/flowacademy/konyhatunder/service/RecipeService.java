package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
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

    public void createRecipe(EmptyRecipe emptyRecipe) {
        validate(emptyRecipe);
        List<Category> categoryList = emptyRecipe.getCategoryList().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(emptyRecipe.getName())
                .description(emptyRecipe.getDescription())
                .level(translateLevel(emptyRecipe.getLevel()))
                .preparationTime(emptyRecipe.getPreparationTime())
                .categoryList(categoryList)
                .build());

        List<AmountOfIngredient> amountOfIngredientList = new ArrayList<>();

        emptyRecipe.getAmountOfIngredientList().forEach(element -> {
            AmountOfIngredient amountOfIng = AmountOfIngredient.builder()
                    .unit(translateUnit(element.getIngredient().getType(),element.getUnit()))
                    .amount(element.getAmount())
                    .recipe(savedRecipe)
                    .ingredient(element.getIngredient())
                    .build();
            amountOfIngredientForARecipeRepository.save(amountOfIng);

            amountOfIngredientList.add(amountOfIng);

        });
        savedRecipe.setAmountOfIngredientList(amountOfIngredientList);
        recipeRepository.save(savedRecipe);
    }
//TODO
    private String translateUnit(Type type, String unit) {
        return null;
    }

    public List<String> listRecipeLevels() {
        return Arrays.stream(Level.values()).map(Level::getHungarianTranslation).collect(Collectors.toList());
    }

    private Level translateLevel(String level) {
        if(Level.EASY.getHungarianTranslation().equals(level)){
            return Level.EASY;
        }
        else if(Level.MEDIUM.getHungarianTranslation().equals(level)){
            return Level.MEDIUM;
        }
        else if(Level.HARD.getHungarianTranslation().equals(level)){
            return Level.HARD;
        }
        else{
            throw new ValidationException("Nem megfelelő nehézségi szint!");
        }

    }

    @SneakyThrows
    private void validate(EmptyRecipe emptyRecipe) {
        if (!StringUtils.hasText(emptyRecipe.getName()))
            throw new ValidationException("A recept nevét kötelező megadni!");

        if (!StringUtils.hasText(emptyRecipe.getDescription()))
            throw new ValidationException("A leírás mező nem lehet üres!");

        if (emptyRecipe.getPreparationTime() <= 0)
            throw new ValidationException("Az elkészítési idő nem lehet 0 vagy annál kisebb!");

        if (emptyRecipe.getLevel() == null)
            throw new ValidationException("Nehézségi szint megadása kötelező!");
      
        if (CollectionUtils.isEmpty(emptyRecipe.getAmountOfIngredientList())) {
            throw new ValidationException("Hozzávalók megadása kötelező!");
        }
    }
}

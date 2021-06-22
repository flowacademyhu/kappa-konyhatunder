package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.AmountOfIngredientForARecipe;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.enums.Level;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
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
    private final IngredientRepository ingredientRepository;

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }

    public void save(EmptyRecipe emptyRecipe) {
        validate(emptyRecipe);
        String newRecipeID = UUID.randomUUID().toString();
        List<Category> categoryList = emptyRecipe.getCategoryList().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        recipeRepository.save(Recipe.builder()
                .id(newRecipeID)
                .name(emptyRecipe.getName())
                .description(emptyRecipe.getDescription())
                .level(emptyRecipe.getLevel())
                .preparationTime(emptyRecipe.getPreparationTime())
                .categoryList(categoryList)
                .build());

        Recipe savedRecipe = recipeRepository.findById(newRecipeID).orElse(null);
        if (savedRecipe == null)
            throw new ValidationException("A mentés nem sikerült");

        List<AmountOfIngredientForARecipe> amountOfIngredientForARecipeList = new ArrayList<>();

        emptyRecipe.getAmountOfIngredientForARecipeList().forEach(element -> {
            AmountOfIngredientForARecipe amountOfIng = AmountOfIngredientForARecipe.builder()
                    .unit(element.getUnit())
                    .amount(element.getAmount())
                    .recipe(savedRecipe)
                    .ingredient(element.getIngredient())
                    .build();
            amountOfIngredientForARecipeRepository.save(amountOfIng);

            amountOfIngredientForARecipeList.add(amountOfIng);

        });
        savedRecipe.setAmountOfIngredientForARecipeList(amountOfIngredientForARecipeList);
        recipeRepository.save(savedRecipe);
    }

    @SneakyThrows
    public void validate(EmptyRecipe emptyRecipe) {
        if (!StringUtils.hasText(emptyRecipe.getName()))
            throw new ValidationException("A recept nevét kötelező megadni");

        if (!StringUtils.hasText(emptyRecipe.getDescription()))
            throw new ValidationException("Ez elkészités mező nem lehet üres");

        if (emptyRecipe.getPreparationTime() <= 0)
            throw new ValidationException("Elkészitése idő nem lehet 0 perc");

        if (emptyRecipe.getLevel() == null)
            throw new ValidationException("Nem jó level");

        if (emptyRecipe.getAmountOfIngredientForARecipeList() == null ||
                emptyRecipe.getAmountOfIngredientForARecipeList().size() == 0) {
            throw new ValidationException("Hozzávalók megadása kötelező!");
        }
    }

    public List<String> getAllRecipeLevels() {
        Level[] levels = Level.values();
        return Arrays.stream(levels).map(Level::getHungarianTranslate).collect(Collectors.toList());
    }
}

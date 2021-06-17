package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;
    private final AmountOfIngredientForARecipeRepository amountOfIngredientForARecipeRepository;

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }

    public void save(EmptyRecipe emptyRecipe) {

//        Recipe savedRecipe = recipeRepository.save(recipe);
//        categoryRepository.saveAll(recipe.getCategoryList());
//
//        ingredientRepository.saveAll(recipe.getAmountOfIngredientForARecipeList().stream()
//                .map(AmountOfIngredientForARecipe::getIngredient).collect(Collectors.toList()));
//
//        amountOfIngredientForARecipeRepository.saveAll(savedRecipe.getAmountOfIngredientForARecipeList());
//

        recipeRepository.save(Recipe.builder()
                .name(emptyRecipe.getName())
                .description(emptyRecipe.getDescription())
                .preparationTime(emptyRecipe.getPreparationTime())
                .build());
    }
}

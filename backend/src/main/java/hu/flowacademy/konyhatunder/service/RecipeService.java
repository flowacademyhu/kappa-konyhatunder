package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.model.AmountOfIngredientForARecipe;
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
import java.util.UUID;
import java.util.stream.Collectors;

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

    public void save(EmptyRecipe emptyRecipe ) {

        recipeRepository.save(Recipe.builder()
                .name(emptyRecipe.getName())
                .level(emptyRecipe.getLevel())
                .description(emptyRecipe.getDescription())
                .preparationTime(emptyRecipe.getPreparationTime())
                .build());


    }
}

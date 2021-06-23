package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.model.Level;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.yaml.snakeyaml.util.EnumUtils;

import javax.transaction.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;

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
        recipeRepository.save(Recipe.builder()
                .name(emptyRecipe.getName())
                .description(emptyRecipe.getDescription())
                .level(emptyRecipe.getLevel())
                .preparationTime(emptyRecipe.getPreparationTime())
                .categoryList(categoryList)
                .build());
    }

    public List<String> listRecipeLevels() {
        return Arrays.stream(Level.values()).map(Enum::name).collect(Collectors.toList());
    }

    @SneakyThrows
    public void validate(EmptyRecipe emptyRecipe) {
        if (!StringUtils.hasText(emptyRecipe.getName()))
            throw new ValidationException("A recept nevét kötelező megadni!");

        if (!StringUtils.hasText(emptyRecipe.getDescription()))
            throw new ValidationException("A leírás mező nem lehet üres!");

        if (emptyRecipe.getPreparationTime() <= 0)
            throw new ValidationException("Az elkészítési idő nem lehet 0 vagy annál kisebb!");

        if (emptyRecipe.getLevel() == null)
            throw new ValidationException("Nem megfelelő nehézségi szint!");
    }
}

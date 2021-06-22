package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.enums.Level;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }

    public void save(EmptyRecipe emptyRecipe) {
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

        if (emptyRecipe.getCategoryList() == null || emptyRecipe.getCategoryList().size() == 0)
            throw new ValidationException("A kategóriák megadása kötelező");

    }

    public List<String> getAllRecipeLevels() {
        Level[] levels = Level.values();
        return Arrays.stream(levels).map(Level::getHungarianTranslate).collect(Collectors.toList());
    }
}

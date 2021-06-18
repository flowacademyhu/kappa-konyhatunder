package hu.flowacademy.konyhatunder.service;

import com.google.common.base.Enums;
import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.exception.ValidationException;
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

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }

    public void save(EmptyRecipe emptyRecipe) {
        validate(emptyRecipe);

        recipeRepository.save(Recipe.builder()
                .name(emptyRecipe.getName())
                .description(emptyRecipe.getDescription())
                .level(emptyRecipe.getLevel())
                .preparationTime(emptyRecipe.getPreparationTime())
                .build());
    }
    @SneakyThrows
    public void validate(EmptyRecipe emptyRecipe){
        if (!StringUtils.hasText(emptyRecipe.getName()))
            throw new ValidationException("A recept nevét kötelező megadni");

        if(!StringUtils.hasText(emptyRecipe.getDescription()))
            throw new ValidationException("Ez elkészités mező nem lehet üres");

        if(emptyRecipe.getPreparationTime() <= 0)
            throw new ValidationException("Elkészitése idő nem lehet 0 perc");
        if(!Enums.getIfPresent(Level.class, emptyRecipe.getLevel().toString().toUpperCase(Locale.ROOT)).isPresent())
            throw new ValidationException("NEm jó level");
    }


    public List<String> getAllRecipeLevels() {
        Level[] levels = Level.values();
        return Arrays.stream(levels).map(Enum::name).collect(Collectors.toList());
    }
}

package hu.flowacademy.konyhatunder.bootstrap;

import com.github.javafaker.Faker;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.model.*;
import hu.flowacademy.konyhatunder.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Component
@RequiredArgsConstructor
public class InitDataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final AmountOfIngredientRepository amountOfIngredientRepository;
    private final ImageRepository imageRepository;

    @Bean
    public Faker faker() {
        return new Faker(Locale.forLanguageTag("hu-HU"));
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    @Override
    public void run(String... args) {
        saveNewCategory();
        saveNewIngredient();
        saveNewRecipes();
        saveNewAmountOfIngredient();
        saveDefaultImage();
    }

    private List<Category> newCategory() {
        List<String> names = List.of("Olcsó", "Ünnepi", "Magyar", "Olasz", "Kínai");
        log.info("Created {} new Categories", names.size());
        return List.of(
                Category.builder().name(names.get(0)).build(),
                Category.builder().name(names.get(1)).build(),
                Category.builder().name(names.get(2)).build(),
                Category.builder().name(names.get(3)).build(),
                Category.builder().name(names.get(4)).build()
        );
    }

    private void saveNewCategory() {
        List<Category> savedCategories = categoryRepository.saveAll(newCategory());
        log.info("Saved {} Categories", savedCategories.size());
    }

    private List<Ingredient> newIngredient() {
        List<Ingredient> ingredientList = List.of(
                Ingredient.builder().name("Liszt").measurement(Measurement.KG).build(),
                Ingredient.builder().name("Cukor").measurement(Measurement.CUP).build(),
                Ingredient.builder().name("Tej").measurement(Measurement.LITER).build(),
                Ingredient.builder().name("Só").measurement(Measurement.OTHER).build(),
                Ingredient.builder().name("Sütopor").measurement(Measurement.SPOON).build(),
                Ingredient.builder().name("Tojás").measurement(Measurement.PIECE).build()
        );
        log.info("Created {} Ingredients", ingredientList.size());
        return ingredientList;
    }

    private void saveNewIngredient() {
        List<Ingredient> savedIngredients = ingredientRepository.saveAll(newIngredient());
        log.info("Saved {} Ingredients", savedIngredients.size());
    }

    private List<Recipe> newRecipes(List<Category> categoryList) {

        List<Recipe> recipes = IntStream.range(0, 3)
                .mapToObj(value -> Recipe.builder()
                        .name(faker().food().dish())
                        .difficulty(Difficulty.values()[new Random().nextInt(Difficulty.values().length)])
                        .categories(categoryList)
                        .description(faker().lorem().sentence(20))
                        .preparationTime(faker().number().randomDouble(1, 5, 300))
                        .build()).collect(Collectors.toList());
        log.info("Created {} new Recipes", recipes.size());
        return recipes;
    }

    private void saveNewRecipes() {
        List<Category> categoryList = categoryRepository.findAll();
        List<Recipe> savedRecipes = recipeRepository.saveAll(newRecipes(categoryList));
        log.info("Saved {} Recipes", savedRecipes.size());
    }

    private List<AmountOfIngredient> newAmountOfIngredient() {
        List<Ingredient> ingredientList = ingredientRepository.findAll();
        List<Recipe> recipeList = recipeRepository.findAll();

        List<AmountOfIngredient> amountOfIngredients = List.of(
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Liszt")).findFirst().get())
                        .amount(1)
                        .unit(MeasurementKilogram.KG.toString())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Cukor")).findFirst().get())
                        .amount(0.5)
                        .unit(MeasurementCup.CUP.toString())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Tej")).findFirst().get())
                        .amount(0.5)
                        .unit(MeasurementLiter.L.toString())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Só")).findFirst().get())
                        .amount(2)
                        .unit(MeasurementOther.PINCH.toString())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Sütopor")).findFirst().get())
                        .amount(1)
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredient.builder().ingredient(ingredientList.stream().filter(e -> e.getName().equals("Tojás")).findFirst().get())
                        .amount(3)
                        .unit(MeasurementPiece.PIECE.toString())
                        .recipe(recipeList.get(0))
                        .build()
        );
        log.info("Created {} new AmountOfIngredients", amountOfIngredients.size());
        return amountOfIngredients;
    }

    private void saveNewAmountOfIngredient() {
       List<AmountOfIngredient> savedAmountOfIngredients =  amountOfIngredientRepository.saveAll(
                newAmountOfIngredient());
        log.info("Saved {} AmountOfIngredients", savedAmountOfIngredients.size());
    }

    private void saveDefaultImage() {
        Image image = new Image("abc", "abc", new byte[0]);
        imageRepository.save(image);
        log.info("Saved a default image");
    }
}

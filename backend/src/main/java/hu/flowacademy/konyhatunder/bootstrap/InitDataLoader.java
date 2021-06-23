package hu.flowacademy.konyhatunder.bootstrap;

import com.github.javafaker.Faker;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.model.*;
import hu.flowacademy.konyhatunder.repository.AmountOfIngredientForARecipeRepository;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Component
@RequiredArgsConstructor
public class InitDataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final AmountOfIngredientForARecipeRepository amountOfIngredientForARecipeRepository;

    @Bean
    public Faker faker() {
        return new Faker(Locale.forLanguageTag("hu-HU"));
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    @Override
    public void run(String... args) throws Exception {
        saveNewCategory();
        saveNewIngredient();
        saveNewRecipes();
        saveNewAmountOfIngredientForARecipe();
    }

    private List<Category> newCategory() {
        List<String> names = List.of("Olcsó", "Ünnepi", "Magyar", "Olasz", "Kínai");
        return List.of(
                Category.builder().name(names.get(0)).build(),
                Category.builder().name(names.get(1)).build(),
                Category.builder().name(names.get(2)).build(),
                Category.builder().name(names.get(3)).build(),
                Category.builder().name(names.get(4)).build()
        );
    }

    private void saveNewCategory() {
        categoryRepository.saveAll(newCategory());
    }

    private List<Ingredient> newIngredient() {
        return List.of(
                Ingredient.builder().name("Liszt").type(Type.KG).build(),
                Ingredient.builder().name("Cukor").type(Type.CUP).build(),
                Ingredient.builder().name("Tej").type(Type.LITER).build(),
                Ingredient.builder().name("Só").type(Type.OTHER).build(),
                Ingredient.builder().name("Sütopor").type(Type.SPOON).build(),
                Ingredient.builder().name("Tojás").type(Type.PIECE).build()
        );
    }

    private void saveNewIngredient() {
        ingredientRepository.saveAll(newIngredient());
    }

    private List<Recipe> newRecipes(List<Category> categoryList) {
        return IntStream.range(0, 3)
                .mapToObj(value -> Recipe.builder()
                        .id(UUID.randomUUID().toString())
                        .name(faker().food().dish())
                        .level(faker().number().numberBetween(1, 4) == 1 ? Level.EASY :
                                faker().number().numberBetween(1, 4) == 2 ? Level.MEDIUM : Level.HARD)
                        .categoryList(categoryList)
                        .description(faker().lorem().sentence(20))
                        .preparationTime(faker().number().randomDouble(1, 5, 300))
                        .build()).collect(Collectors.toList());
    }

    private void saveNewRecipes() {
        List<Category> categoryList = categoryRepository.findAll();
        recipeRepository.saveAll(newRecipes(categoryList));
    }

    private List<AmountOfIngredientForARecipe> newAmountOfIngredientForARecipe() {
        List<Ingredient> ingredientList = ingredientRepository.findAll();
        List<Recipe> recipeList = recipeRepository.findAll();
        System.out.println(ingredientList.get(0) + " "+ingredientList.get(1));
        return List.of(
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Liszt")).findFirst().get())
                        .amount(1)
                        .unit(TypeKilogramm.KG.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Cukor")).findFirst().get())
                        .amount(0.5)
                        .unit(TypeCup.CUP.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Tej")).findFirst().get())
                        .amount(0.5)
                        .unit(TypeLiter.L.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Só")).findFirst().get())
                        .amount(2)
                        .unit(TypeOther.PINCH.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Sütopor")).findFirst().get())
                        .amount(1)
                        .unit(TypeSpoon.TEA_SPOON.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build(),
                AmountOfIngredientForARecipe.builder().ingredient(ingredientList.stream().filter(e->e.getName().equals("Tojás")).findFirst().get())
                        .amount(3)
                        .unit(TypePiece.PIECE.getHungarianTranslation())
                        .recipe(recipeList.get(0))
                        .build()
        );
    }

    private void saveNewAmountOfIngredientForARecipe() {
        amountOfIngredientForARecipeRepository.saveAll(
                newAmountOfIngredientForARecipe());

    }


}

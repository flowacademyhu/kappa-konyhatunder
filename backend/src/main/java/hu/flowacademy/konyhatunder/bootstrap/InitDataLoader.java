package hu.flowacademy.konyhatunder.bootstrap;

import com.github.javafaker.Faker;
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
import java.util.Random;
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

    private List<Category> newCategory(){
        List<String> names = List.of("Olcsó","Ünnepi","Egyszerű", "Olasz", "Kínai");
        return List.of(
                Category.builder().name(names.get(0)).build(),
                Category.builder().name(names.get(1)).build(),
                Category.builder().name(names.get(2)).build(),
                Category.builder().name(names.get(3)).build(),
                Category.builder().name(names.get(4)).build()

                );
    }

    private void saveNewCategory(){
        categoryRepository.saveAll(newCategory());
    }

    private List<Ingredient> newIngredient(){
        return IntStream.range(0,10)
                .mapToObj(value -> Ingredient.builder()
                        .name(faker().food().ingredient())
                        .type(faker().number().numberBetween(1,3) == 1 ? Type.SOLID: Type.LIQUID)
                        .build()).collect(Collectors.toList());
    }

    private void saveNewIngredient(){
        ingredientRepository.saveAll(newIngredient());
    }

    private List<Recipe> newRecipes(List<Category> categoryList){
        return IntStream.range(0,10)
                .mapToObj(value -> Recipe.builder()
                        .name(faker().food().dish())
                        .level(faker().number().numberBetween(1,4) == 1 ? Level.EASY :
                                faker().number().numberBetween(1,4) == 2? Level.MEDIUM : Level.HARD)
                        .categoryList(categoryList)
                        .description(faker().chuckNorris().fact())
                        .preparationTime(faker().number().randomDouble(1,5,300))
                        .build()).collect(Collectors.toList());
    }
    private void saveNewRecipes(){
        List<Category> categoryList = categoryRepository.findAll();
        recipeRepository.saveAll(newRecipes(categoryList));
    }

    private List<AmountOfIngredientForARecipe> newAmountOfIngredientForARecipe(){
        List<Ingredient> ingredientList  = ingredientRepository.findAll();
        List<Recipe> recipeList = recipeRepository.findAll();
        return IntStream.range(0,10).mapToObj(value->
                AmountOfIngredientForARecipe.builder()
                        .recipe(recipeList.get(new Random().nextInt(recipeList.size())))
                        .ingredient(ingredientList.get(new Random().nextInt(ingredientList.size())))
                        .unit(faker().food().measurement())
                        .amount(faker().number().randomDouble(1,1,5))
                        .build()
                ).collect(Collectors.toList());
    }

    private void saveNewAmountOfIngredientForARecipe(){

        amountOfIngredientForARecipeRepository.saveAll(
        newAmountOfIngredientForARecipe());

    }


}

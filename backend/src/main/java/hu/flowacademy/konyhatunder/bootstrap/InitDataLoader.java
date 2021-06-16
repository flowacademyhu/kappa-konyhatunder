package hu.flowacademy.konyhatunder.bootstrap;

import com.github.javafaker.Faker;
import hu.flowacademy.konyhatunder.model.*;
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
    }

    private List<Category> newCategory(){
        List<String> names = List.of("Olcsó","Ünnepi","Egyszerű");
        return IntStream.range(0,10)
                .mapToObj(value-> Category.builder()
                        .name(names.get(new Random().nextInt(names.size())))
                        .build()).collect(Collectors.toList());
    }

    private void saveNewCategory(){
        categoryRepository.saveAll(newCategory());
    }

    private List<Ingredient> newIngredient(){
        return IntStream.range(0,10)
                .mapToObj(value -> Ingredient.builder()
                        .name(faker().food().ingredient())
                        .amount(faker().number().randomDouble(1,1,2))
                        .type(faker().number().numberBetween(1,3) == 1 ? Type.SOLID: Type.LIQUID)
                        .unit(faker().food().measurement())
                        .build()).collect(Collectors.toList());
    }

    private void saveNewIngredient(){
        ingredientRepository.saveAll(newIngredient());
    }

    private List<Recipe> newRecipes(List<Ingredient> ingredientList, List<Category> categoryList){
        return IntStream.range(0,10)
                .mapToObj(value -> Recipe.builder()
                        .name(faker().food().dish())
                        .level(faker().number().numberBetween(1,4) == 1 ? Level.EASY :
                                faker().number().numberBetween(1,4) == 2? Level.MEDIUM : Level.HARD)
                        .categoryList(categoryList)
                        .ingredientList(ingredientList.subList(0,5))
                        .build()).collect(Collectors.toList());
    }
    private void saveNewRecipes(){
        List<Category> categoryList = categoryRepository.findAll();
        List<Ingredient> ingredientList  = ingredientRepository.findAll();
        recipeRepository.saveAll(newRecipes(ingredientList, categoryList));
    }



}
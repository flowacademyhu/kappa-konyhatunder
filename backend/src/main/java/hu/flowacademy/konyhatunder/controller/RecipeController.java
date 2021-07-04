package hu.flowacademy.konyhatunder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import hu.flowacademy.konyhatunder.dto.SearchByCriteriaDTO;
import hu.flowacademy.konyhatunder.dto.SearchByIngredientDTO;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.RecipeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> listRecipes() {
        log.debug("Get all Recipe");
        return recipeService.listRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable String id) {
        log.debug("Get a Recipe with this id: {}", id);
        return recipeService.getRecipe(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recipe createRecipe(@RequestPart String recipeDTO, @RequestPart(name = "image", required = false) MultipartFile image) throws JsonProcessingException {
        log.debug("Try to save a Recipe with this params: {}", recipeDTO);
        return recipeService.createRecipe(recipeDTO, image);
    }

    @GetMapping("/difficutlies")
    public List<String> listRecipeDifficulties() {
        log.debug("Get all Difficulty");
        return recipeService.listRecipeDifficulty();
    }

    @PostMapping("/search/ingredients")
    public SearchByIngredientDTO listRecipesByIngredients(@RequestBody List<Ingredient> ingredientList) {
        log.debug("Recieved {} ingredtients", ingredientList.size());
        return recipeService.listRecipesByIngredients(ingredientList);
    }

    @PostMapping("/search/criteria")
    public List<Recipe> listRecipesByCriteria(@RequestBody SearchByCriteriaDTO searchByCriteriaDTO) {
        log.debug("Search by these {} criteria", searchByCriteriaDTO);
        return recipeService.listRecipesByCriteria(searchByCriteriaDTO);
    }

    @PostMapping("{id}/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void recommendARecipe(@RequestParam(name = "recommend") String recommend, @PathVariable String id){
        recipeService.recommendARecipe(recommend, id);
    }
}

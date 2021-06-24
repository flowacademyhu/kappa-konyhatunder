package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public List<Recipe> listRecipes() {
        return recipeService.listRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable String id) {
        return recipeService.getRecipe(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recipe createRecipe(@RequestBody RecipeDTO recipeDTO) {
        return recipeService.createRecipe(recipeDTO);
    }

    @GetMapping("/levels")
    public List<String> listRecipeLevels() {
        return recipeService.listRecipeLevels();
    }
}

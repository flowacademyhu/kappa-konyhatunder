package hu.flowacademy.konyhatunder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public List<Recipe> listRecipes() {
        log.debug("Get all Recipe in RecipeController");
        return recipeService.listRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable String id) {
        log.debug("Get a Recipe with this id: {} in RecipeController",id);
        return recipeService.getRecipe(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recipe createRecipe(@RequestPart String recipeDTO, @RequestPart(name = "image", required = false) MultipartFile image) throws JsonProcessingException {
        log.debug("Try to save a Recipe with this image name: {} in RecipeController",image.getName());
        log.debug("Try to save a Recipe with this params: {} in RecipeController",recipeDTO);
        return recipeService.createRecipe(recipeDTO, image);
    }

    @GetMapping("/levels")
    public List<String> listRecipeLevels() {
        log.debug("Get all Difficulty in RecipeController");
        return recipeService.listRecipeDifficulty();
    }
}

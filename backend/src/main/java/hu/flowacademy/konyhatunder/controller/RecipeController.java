package hu.flowacademy.konyhatunder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.ImageRepository;
import hu.flowacademy.konyhatunder.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;
    private final ImageRepository imageRepository;

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
    public Recipe createRecipe(@RequestPart String recipeDTO, @RequestPart(name = "image", required = false) MultipartFile image) throws JsonProcessingException {
        return recipeService.createRecipe(recipeDTO, image);
    }

    @GetMapping("/levels")
    public List<String> listRecipeLevels() {
        return recipeService.listRecipeLevels();
    }
}

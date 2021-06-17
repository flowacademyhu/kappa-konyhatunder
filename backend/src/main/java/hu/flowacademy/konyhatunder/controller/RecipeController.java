package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.dto.EmptyRecipe;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @CrossOrigin
    @GetMapping
    public List<Recipe> findAll() {
        return recipeService.findAll();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Optional<Recipe> findById(@PathVariable String id) {
        return recipeService.findById(id);
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void save(@RequestBody EmptyRecipe emptyRecipe) {
        recipeService.save(emptyRecipe);
    }

    @CrossOrigin
    @GetMapping("/levels")
    public List<String> getAllRecipeLevels() {
        return recipeService.getAllRecipeLevels();
    }
}

package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;


    @GetMapping
    public List<Ingredient> listIngredients() {
        return ingredientService.listIngredients();
    }

    @GetMapping("/{id}")
    public Ingredient getIngredient(@PathVariable String id) {
        return ingredientService.getIngredient(id);
    }
}

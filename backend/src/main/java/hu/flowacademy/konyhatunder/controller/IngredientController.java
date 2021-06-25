package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.service.IngredientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    public List<Ingredient> listIngredients() {
        log.debug("Get all Ingredient in IngredientController");
        return ingredientService.listIngredients();
    }

    @GetMapping("/{id}")
    public IngredientDTO getIngredient(@PathVariable String id) {
        log.debug("Get an ingredient with this id: {} in IngredientController",id);
        return ingredientService.getIngredient(id);
    }
}

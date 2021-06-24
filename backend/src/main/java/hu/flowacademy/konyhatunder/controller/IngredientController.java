package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.dto.CreateIngredientDTO;
import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.service.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public IngredientDTO getIngredient(@PathVariable String id) {
        return ingredientService.getIngredient(id);
    }

    @GetMapping("/measurements")
    public List<String> listMeasurements(){
        return ingredientService.listMeasurements();
    }
    @GetMapping("/measurements/{unit}")
    public List<String> listMeasurementUnit(@PathVariable String unit){
        return ingredientService.listMeasurementsUnit(unit);
    }
    @PostMapping
    public Ingredient createIngredient(@RequestBody CreateIngredientDTO ingredient){
        return ingredientService.createIngredient(ingredient);
    }
}

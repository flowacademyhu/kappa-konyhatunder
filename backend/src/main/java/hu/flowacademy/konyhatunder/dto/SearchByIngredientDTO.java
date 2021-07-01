package hu.flowacademy.konyhatunder.dto;

import hu.flowacademy.konyhatunder.model.Recipe;
import lombok.Data;

import java.util.List;
@Data
public class SearchByIngredientDTO {

    private List<Recipe> recipesWithAllIngredient;
    private List<Recipe> recipesWithAlmostAllIngredient;
    private List<Recipe> recipesWithMinimumOneIngredient;

}

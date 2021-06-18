package hu.flowacademy.konyhatunder.dto;

import hu.flowacademy.konyhatunder.model.AmountOfIngredientForARecipe;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.model.Level;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class EmptyRecipe {
    private String name;
    @Enumerated(EnumType.STRING)
    private Level level;
    private String description;
    private double preparationTime;
    private List<String> categoryList;
}

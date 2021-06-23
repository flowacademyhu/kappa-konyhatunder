package hu.flowacademy.konyhatunder.dto;

import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class EmptyRecipe {
    private String name;
    @Enumerated(EnumType.STRING)
    private String level;
    private String description;
    private double preparationTime;
    private List<String> categoryList;
    private List<AmountOfIngredient> amountOfIngredientList;
}

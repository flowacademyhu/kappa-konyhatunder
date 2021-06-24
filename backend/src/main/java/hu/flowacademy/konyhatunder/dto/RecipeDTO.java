package hu.flowacademy.konyhatunder.dto;

import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class RecipeDTO {
    private String name;
    @Enumerated(EnumType.STRING)
    private String difficulty;
    private String description;
    private double preparationTime;
    private List<String> categories;
    private List<AmountOfIngredient> ingredients;
}

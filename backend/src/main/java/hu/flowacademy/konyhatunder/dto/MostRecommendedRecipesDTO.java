package hu.flowacademy.konyhatunder.dto;

import lombok.Data;

@Data
public class MostRecommendedRecipesDTO {
    private String id;
    private String name;
    private String description;
    private Integer recommendations;
}

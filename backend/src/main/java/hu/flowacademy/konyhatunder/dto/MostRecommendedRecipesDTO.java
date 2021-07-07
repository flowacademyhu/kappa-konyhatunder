package hu.flowacademy.konyhatunder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MostRecommendedRecipesDTO {
    private String id;
    private String name;
    private String description;
    private Integer recommendations;
}

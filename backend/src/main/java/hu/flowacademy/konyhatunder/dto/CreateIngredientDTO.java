package hu.flowacademy.konyhatunder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class CreateIngredientDTO {
    private String id;
    private String name;
    private String measurement;
}

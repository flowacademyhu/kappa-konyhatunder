package hu.flowacademy.konyhatunder.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class IngredientDTO {
    private String id;
    private String name;
    private List<String> measurements;
}

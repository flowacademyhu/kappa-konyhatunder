package hu.flowacademy.konyhatunder.dto;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class SearchByCriteriaDTO {
    private String name;
    private int preparationTime;
    private String difficulty;
    private List<String> categories;
    private boolean isHasPicture;
}
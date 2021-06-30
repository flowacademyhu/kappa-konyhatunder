package hu.flowacademy.konyhatunder.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchByCriteriaDTO {
    private String name;
    private int preparationTime;
    private String difficulty;
    private List<String> categories;
    private Boolean hasPicture;
}
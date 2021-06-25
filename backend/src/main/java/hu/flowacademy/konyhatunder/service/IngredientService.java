package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {

    private static final String ERROR_MESSAGE_MISSING_ID = "Nincs ilyen ID-val rendelkező hozzávaló!";
    private final IngredientRepository ingredientRepository;

    public List<Ingredient> listIngredients() {
        List<Ingredient> allIngredient = ingredientRepository.findAll();
        log.debug("Get all {} ingredients in IngredientService",allIngredient.size());
            return allIngredient;
    }

    public IngredientDTO getIngredient(String id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(() ->
                new MissingIDException(ERROR_MESSAGE_MISSING_ID));

        List<String> typeList = null;
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.CUP.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementCup.values()).map(MeasurementCup::getHungarianTranslation).collect(Collectors.toList());
        }
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.KG.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementKilogram.values()).map(MeasurementKilogram::getHungarianTranslation).collect(Collectors.toList());
        }
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.LITER.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementLiter.values()).map(MeasurementLiter::getHungarianTranslation).collect(Collectors.toList());
        }
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.OTHER.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementOther.values()).map(MeasurementOther::getHungarianTranslation).collect(Collectors.toList());
        }
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.PIECE.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementPiece.values()).map(MeasurementPiece::getHungarianTranslation).collect(Collectors.toList());
        }
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.SPOON.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementSpoon.values()).map(MeasurementSpoon::getHungarianTranslation).collect(Collectors.toList());
        }
        IngredientDTO sentIngredientDTO = IngredientDTO.builder()
                .name(ingredient.getName())
                .id(ingredient.getId())
                .measurements(typeList)
                .build();
        log.debug("Create an Ingredient with these params: {} in IngredientService.",sentIngredientDTO);
        return sentIngredientDTO;
    }
}

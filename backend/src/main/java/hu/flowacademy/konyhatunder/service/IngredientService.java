package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.dto.CreateIngredientDTO;
import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class IngredientService {

    private static final String ERROR_MESSAGE_MISSING_ID = "Nincs ilyen ID-val rendelkező hozzávaló!";
    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> listIngredients() {
        List<Ingredient> allIngredient = ingredientRepository.findAll();
        log.debug("Get all ({}) ingredients", allIngredient.size());
        return allIngredient;
    }

    public IngredientDTO getIngredient(String id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(() ->
                new MissingIDException(ERROR_MESSAGE_MISSING_ID));
        log.debug("Get an Ingredient with this id: {}", id);
        List<String> typeList = null;
        if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.CUP.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementCup.values()).map(MeasurementCup::getHungarianTranslation).collect(Collectors.toList());
        } else if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.KG.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementKilogram.values()).map(MeasurementKilogram::getHungarianTranslation).collect(Collectors.toList());
        } else if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.LITER.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementLiter.values()).map(MeasurementLiter::getHungarianTranslation).collect(Collectors.toList());
        } else if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.OTHER.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementOther.values()).map(MeasurementOther::getHungarianTranslation).collect(Collectors.toList());
        } else if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.PIECE.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementPiece.values()).map(MeasurementPiece::getHungarianTranslation).collect(Collectors.toList());
        } else if (ingredient.getMeasurement().getHungarianTranslation().equals(Measurement.SPOON.getHungarianTranslation())) {
            typeList = Arrays.stream(MeasurementSpoon.values()).map(MeasurementSpoon::getHungarianTranslation).collect(Collectors.toList());
        }
        return IngredientDTO.builder()
                .name(ingredient.getName())
                .id(ingredient.getId())
                .measurements(typeList)
                .build();
    }

    public List<String> listMeasurements() {
        log.debug("List all Measurement.");
        return Arrays.stream(Measurement.values()).map(Measurement::getHungarianTranslation).collect(Collectors.toList());
    }

    public List<String> listMeasurementsUnit(String unit) {
        log.debug("List all Unit of a Measurement.");
        switch (unit) {
            case "Kilogramm":
                return Arrays.stream(MeasurementKilogram.values()).map(MeasurementKilogram::getHungarianTranslation).collect(Collectors.toList());
            case "Liter":
                return Arrays.stream(MeasurementLiter.values()).map(MeasurementLiter::getHungarianTranslation).collect(Collectors.toList());
            case "Kanál":
                return Arrays.stream(MeasurementSpoon.values()).map(MeasurementSpoon::getHungarianTranslation).collect(Collectors.toList());
            case "Bögre":
                return Arrays.stream(MeasurementCup.values()).map(MeasurementCup::getHungarianTranslation).collect(Collectors.toList());
            case "Darab":
                return Arrays.stream(MeasurementPiece.values()).map(MeasurementPiece::getHungarianTranslation).collect(Collectors.toList());
            default:
                return Arrays.stream(MeasurementOther.values()).map(MeasurementOther::getHungarianTranslation).collect(Collectors.toList());
        }
    }

    public Ingredient createIngredient(CreateIngredientDTO createIngredientDTO) {
        validate(createIngredientDTO);
        Ingredient savedIngredient = ingredientRepository.save(Ingredient.builder()
                .name(convertName(createIngredientDTO.getName()))
                .measurement(translateMeasurement(createIngredientDTO.getMeasurement()))
                .build());
        log.debug("Saved an ingredient with these params: {}", savedIngredient);
        return savedIngredient;
    }

    private void validate(CreateIngredientDTO createIngredientDTO) {
        log.debug("Validating new Ingredient.");
        List<Ingredient> allIngredient = ingredientRepository.findAll();
        if (!StringUtils.hasText(createIngredientDTO.getName())) {
            throw new ValidationException("Hozzávaló nevének megadása kötelező!");
        }
        String newIngredientName = convertName(createIngredientDTO.getName());
        Measurement newIngredientMeasurement = translateMeasurement(createIngredientDTO.getMeasurement());
        boolean isExistingIngredient = allIngredient.stream().anyMatch(ingredient ->
                ingredient.getName().equals(newIngredientName) && ingredient.getMeasurement().equals(newIngredientMeasurement));
        if (isExistingIngredient) {
            throw new ValidationException("Már létezik ilyen nevű és alapegységű hozávaló!");
        }
    }

    private String convertName(String name) {
        String firstLetter = name.substring(0, 1).toUpperCase();
        String remainingLetters = name.substring(1).toLowerCase();
        log.debug("Convert this: {} ingredient name to this {} in ingredientService", name, firstLetter + remainingLetters);
        return firstLetter + remainingLetters;
    }

    private Measurement translateMeasurement(String measurement) {
        if (Measurement.CUP.getHungarianTranslation().equals(measurement)) {
            return Measurement.CUP;
        } else if (Measurement.KG.getHungarianTranslation().equals(measurement)) {
            return Measurement.KG;
        } else if (Measurement.LITER.getHungarianTranslation().equals(measurement)) {
            return Measurement.LITER;
        } else if (Measurement.SPOON.getHungarianTranslation().equals(measurement)) {
            return Measurement.SPOON;
        } else if (Measurement.PIECE.getHungarianTranslation().equals(measurement)) {
            return Measurement.PIECE;
        } else if (Measurement.OTHER.getHungarianTranslation().equals(measurement)) {
            return Measurement.OTHER;
        } else {
            throw new ValidationException("Nem megfelelő alapegység!");
        }
    }
}

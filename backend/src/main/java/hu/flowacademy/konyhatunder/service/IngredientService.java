package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public List<Ingredient> listIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredient(String id) {
        return ingredientRepository.findById(id).orElseThrow(() ->
                new ValidationException("Nincs ilyen ID-val rendelkező hozzávaló!"));
    }
}

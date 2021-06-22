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

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    public Ingredient findById(String id) {
        Ingredient ingredient =  ingredientRepository.findById(id).orElse(null);
        if(ingredient == null)
            throw new ValidationException("Nincs ilyen ID-val rendelkező hozzávaló!");
        return ingredient;
    }
}

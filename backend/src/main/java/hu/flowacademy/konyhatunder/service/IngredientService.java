package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> findById(String id) {
        return ingredientRepository.findById(id);
    }
}

package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmountOfIngredientForARecipeRepository extends JpaRepository<AmountOfIngredient,String> {
}

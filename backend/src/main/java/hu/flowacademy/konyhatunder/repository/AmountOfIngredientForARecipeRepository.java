package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.AmountOfIngredientForARecipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmountOfIngredientForARecipeRepository extends JpaRepository<AmountOfIngredientForARecipe,String> {
}

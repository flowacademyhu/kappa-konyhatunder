package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.AmountOfIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountOfIngredientForARecipeRepository extends JpaRepository<AmountOfIngredient,String> {
}

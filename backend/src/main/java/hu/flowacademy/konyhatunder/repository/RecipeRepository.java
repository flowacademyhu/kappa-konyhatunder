package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {
    Set<Recipe> findByIngredientsIngredientId(String id);
}

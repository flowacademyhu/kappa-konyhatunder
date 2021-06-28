package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,String> {
    List<Recipe> findByIngredientsIngredientId(String id);
}

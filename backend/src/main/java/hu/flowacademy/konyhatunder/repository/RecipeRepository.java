package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.enums.Difficulty;
import hu.flowacademy.konyhatunder.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {

    @Query("Select distinct r from Recipe r inner join r.ingredients ing inner join ing.ingredient i where i.id = :ingredientId")
    Set<Recipe> findAllRecipesContainingIngredient(String ingredientId);

    List<Recipe> findByNameContaining(String name);

    List<Recipe> findByDifficulty(Difficulty translateDifficulty);

    List<Recipe> findByPreparationTimeBetween(Double start, Double end);
}


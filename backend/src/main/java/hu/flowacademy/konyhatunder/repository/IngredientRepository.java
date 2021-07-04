package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.enums.Measurement;
import hu.flowacademy.konyhatunder.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient,String> {

    Ingredient findByNameAndMeasurement(String name, Measurement measurement);
}

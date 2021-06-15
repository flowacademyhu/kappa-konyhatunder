package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.FilterCriterion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilterCriterionRepository extends JpaRepository<FilterCriterion,String> {
}

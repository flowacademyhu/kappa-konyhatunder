package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,String> {
}

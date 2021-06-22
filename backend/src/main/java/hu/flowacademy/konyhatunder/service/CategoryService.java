package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(String id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if(category == null)
            throw new ValidationException("Nincs ilyen ID-val rendelkező kategória");
        return category;
    }

    public void saveNewCategory(Category category) {
        validate(category);
        String firstLetter = category.getName().substring(0, 1).toUpperCase();
        String remainingLetters = category.getName().substring(1).toLowerCase();
        categoryRepository.save(Category.builder()
                .name(firstLetter+remainingLetters)
                .build());
    }

    private void validate(Category category) {
        if(!StringUtils.hasText(category.getName())){
            throw new ValidationException("Kategória név megadása kötelező!");
        }
    }
}

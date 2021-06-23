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

    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategory(String id) {
        return categoryRepository.findById(id).orElseThrow(() ->
                new ValidationException("Nincs ilyen ID-val rendelkező kategória"));
    }

    public void createCategory(Category category) {
        validate(category);
        categoryRepository.save(new Category(convertName(category.getName())));
    }

    private String convertName(String name){
        String firstLetter = name.substring(0, 1).toUpperCase();
        String remainingLetters = name.substring(1).toLowerCase();
        return firstLetter+remainingLetters;
    }

    private void validate(Category category) {
        if (!StringUtils.hasText(category.getName())) {
            throw new ValidationException("Kategória név megadása kötelező!");
        }
    }
}

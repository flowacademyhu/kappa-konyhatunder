package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> listCategories() {
        List<Category> allCategory = categoryRepository.findAll();
        log.debug("Get all {} Category.", allCategory.size());
        return allCategory;
    }

    public Category getCategory(String id) {
        log.debug("Get a Category with this id: {}", id);
        return categoryRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkező kategória"));
    }

    public Category createCategory(Category category) {
        validate(category);
        Category savedCategory = categoryRepository.save(new Category(convertName(category.getName())));
        log.debug("Create a category with these params: {}", savedCategory);
        return savedCategory;
    }

    private String convertName(String name) {
        String firstLetter = name.substring(0, 1).toUpperCase();
        String remainingLetters = name.substring(1).toLowerCase();
        log.debug("Convert this: {} category name to this {}", name, firstLetter + remainingLetters);
        return firstLetter + remainingLetters;
    }

    private void validate(Category category) {
        log.debug("Validating a category.");
        if (!StringUtils.hasText(category.getName())) {
            throw new ValidationException("Kategória név megadása kötelező!");
        }
    }
}

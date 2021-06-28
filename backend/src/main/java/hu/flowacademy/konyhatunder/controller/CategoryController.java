package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> listCategories() {
        log.debug("Get all Category");
        return categoryService.listCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable String id) {
        log.debug("Get a Category with this id: {}", id);
        return categoryService.getCategory(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody Category category) {
        log.debug("Try to save a Category with these parameters {}", category);
        return categoryService.createCategory(category);
    }
}

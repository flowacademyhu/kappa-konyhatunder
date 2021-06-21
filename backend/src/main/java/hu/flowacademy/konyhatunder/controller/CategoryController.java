package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.model.Category;
import hu.flowacademy.konyhatunder.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @CrossOrigin
    @GetMapping
    public List<Category> findAll() {
        return categoryService.findAll();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Optional<Category> findById(@PathVariable String id) {
        return categoryService.findById(id);
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveNewCategory(@RequestBody Category category){
        categoryService.saveNewCategory(category);
    }
}

package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.model.FilterCriterion;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.service.FilterCriterionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/filter-criterion")
public class FilterCriterionController {

    private final FilterCriterionService filterCriterionService;

    @GetMapping
    public List<FilterCriterion> findAll(){
        return filterCriterionService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<FilterCriterion> findById(@PathVariable String id){
        return filterCriterionService.findById(id);
    }
}

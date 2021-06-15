package hu.flowacademy.konyhatunder.controller;

import hu.flowacademy.konyhatunder.service.FilterCriterionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/filter-criterion")
public class FilterCriterionController {

    private final FilterCriterionService filterCriterionService;
}

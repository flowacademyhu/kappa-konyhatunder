package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.model.FilterCriterion;
import hu.flowacademy.konyhatunder.repository.FilterCriterionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FilterCriterionService {

    private final FilterCriterionRepository filterCriterionRepository;

    public List<FilterCriterion> findAll() {
        return filterCriterionRepository.findAll();
    }

    public Optional<FilterCriterion> findById(String id) {
        return filterCriterionRepository.findById(id);
    }
}

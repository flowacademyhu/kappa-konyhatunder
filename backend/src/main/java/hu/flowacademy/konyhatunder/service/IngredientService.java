package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.model.Ingredient;
import hu.flowacademy.konyhatunder.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    static final String MISSING_ID="Nincs ilyen ID-val rendelkező hozzávaló!";

    public List<Ingredient> listIngredients() {
        return ingredientRepository.findAll();
    }

    public IngredientDTO findById(String id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(() ->
                new MissingIDException(MISSING_ID));

        List<String> typeList = null;
        if(ingredient.getType().getHungarianTranslation().equals(Type.CUP.getHungarianTranslation())){
            typeList = Arrays.stream(TypeCup.values()).map(TypeCup::getHungarianTranslation).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslation().equals(Type.KG.getHungarianTranslation())){
            typeList = Arrays.stream(TypeKilogramm.values()).map(TypeKilogramm::getHungarianTranslation).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslation().equals(Type.LITER.getHungarianTranslation())){
            typeList = Arrays.stream(TypeLiter.values()).map(TypeLiter::getHungarianTranslation).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslation().equals(Type.OTHER.getHungarianTranslation())){
            typeList = Arrays.stream(TypeOther.values()).map(TypeOther::getHungarianTranslation).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslation().equals(Type.PIECE.getHungarianTranslation())){
            typeList = Arrays.stream(TypePiece.values()).map(TypePiece::getHungarianTranslation).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslation().equals(Type.SPOON.getHungarianTranslation())){
            typeList = Arrays.stream(TypeSpoon.values()).map(TypeSpoon::getHungarianTranslation).collect(Collectors.toList());
        }
            return IngredientDTO.builder()
                .name(ingredient.getName())
                .id(ingredient.getId())
                .typeList(typeList)
                .build();
    }

    public Ingredient getIngredient(String id) {
        return ingredientRepository.findById(id).orElseThrow(() ->
                new MissingIDException(MISSING_ID));
    }
}

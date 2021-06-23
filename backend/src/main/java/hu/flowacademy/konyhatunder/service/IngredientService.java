package hu.flowacademy.konyhatunder.service;


import hu.flowacademy.konyhatunder.dto.IngredientDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
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

    public List<Ingredient> listIngredients() {
        return ingredientRepository.findAll();
    }

    public IngredientDTO findById(String id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElse(null);
        validate(ingredient);
           List<String> typeList = null;
        if(ingredient.getType().getHungarianTranslate().equals(Type.CUP.getHungarianTranslate())){
            typeList = Arrays.stream(TypeCup.values()).map(TypeCup::getHungarianTranslate).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslate().equals(Type.KG.getHungarianTranslate())){
            typeList = Arrays.stream(TypeKilogramm.values()).map(TypeKilogramm::getHungarianTranslate).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslate().equals(Type.LITER.getHungarianTranslate())){
            typeList = Arrays.stream(TypeLiter.values()).map(TypeLiter::getHungarianTranslate).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslate().equals(Type.OTHER.getHungarianTranslate())){
            typeList = Arrays.stream(TypeOther.values()).map(TypeOther::getHungarianTranslate).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslate().equals(Type.PIECE.getHungarianTranslate())){
            typeList = Arrays.stream(TypePiece.values()).map(TypePiece::getHungarianTranslate).collect(Collectors.toList());
        }
        if(ingredient.getType().getHungarianTranslate().equals(Type.SPOON.getHungarianTranslate())){
            typeList = Arrays.stream(TypeSpoon.values()).map(TypeSpoon::getHungarianTranslate).collect(Collectors.toList());
        }
            return IngredientDTO.builder()
                .name(ingredient.getName())
                .id(ingredient.getId())
                .typeList(typeList)
                .build();
    }

    public Ingredient getIngredient(String id) {
        return ingredientRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkező hozzávaló!"));
    }
}

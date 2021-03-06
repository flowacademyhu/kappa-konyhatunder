package hu.flowacademy.konyhatunder.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.flowacademy.konyhatunder.dto.MostRecommendedRecipeDTO;
import hu.flowacademy.konyhatunder.dto.RecipeDTO;
import hu.flowacademy.konyhatunder.dto.SearchByCriteriaDTO;
import hu.flowacademy.konyhatunder.dto.SearchByIngredientDTO;
import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.enums.Difficulty;
import hu.flowacademy.konyhatunder.enums.Measurement;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.*;
import hu.flowacademy.konyhatunder.repository.*;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.text.Collator;
import java.text.RuleBasedCollator;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional
public class RecipeService {

    private static final int MOST_RECOMMENDED_RECIPE_NUMBER = 7;
    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final AmountOfIngredientRepository amountOfIngredientRepository;
    private final ImageStorageService imageStorageService;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, CategoryRepository categoryRepository,
                         AmountOfIngredientRepository amountOfIngredientRepository, ImageStorageService imageStorageService,
                         IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.amountOfIngredientRepository = amountOfIngredientRepository;
        this.imageStorageService = imageStorageService;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Recipe> listRecipes() {
        List<Recipe> allRecipes = recipeRepository.findAll();
        log.debug("Get all {} recipes", allRecipes.size());
        return allRecipes;
    }

    public Recipe getRecipe(String id) {
        log.debug("Get a recipe with this id: {}", id);
        return recipeRepository.findById(id).orElseThrow(() ->
                new MissingIDException("Nincs ilyen ID-val rendelkez?? recept!"));
    }

    public Recipe createRecipe(String stringRecipe, MultipartFile image) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        RecipeDTO recipeDTO = mapper.readValue(stringRecipe, RecipeDTO.class);

        validate(recipeDTO);

        Image imageFile = imageStorageService.storeFile(image);
        List<Category> categoryList = recipeDTO.getCategories().stream().map(categoryRepository::findByName).collect(Collectors.toList());
        Recipe savedRecipe = recipeRepository.save(Recipe.builder()
                .name(recipeDTO.getName())
                .description(recipeDTO.getDescription())
                .difficulty(translateDifficulty(recipeDTO.getDifficulty()))
                .image(imageFile)
                .preparationTime(recipeDTO.getPreparationTime())
                .categories(categoryList)
                .build());

        List<AmountOfIngredient> amountOfIngredientList = new ArrayList<>();

        recipeDTO.getIngredients().forEach(element -> {
            AmountOfIngredient amountOfIng = AmountOfIngredient.builder()
                    .unit(translateUnit(element.getIngredient().getMeasurement(), element.getUnit()))
                    .amount(element.getAmount())
                    .recipe(savedRecipe)
                    .ingredient(element.getIngredient())
                    .build();
            amountOfIngredientRepository.save(amountOfIng);
            amountOfIngredientList.add(amountOfIng);
        });
        savedRecipe.setIngredients(amountOfIngredientList);
        Recipe savedRecipeInRepository = recipeRepository.save(savedRecipe);
        log.debug("Saving a Recipe with this id: {} and name: {}", savedRecipeInRepository.getId(), savedRecipeInRepository.getName());
        return savedRecipeInRepository;
    }

    public List<String> listRecipeDifficulty() {
        List<String> difficulties = Arrays.stream(Difficulty.values()).map(Difficulty::getHungarianTranslation).collect(Collectors.toList());
        log.debug("Listing all: {} difficulties", difficulties.size());
        return difficulties;
    }

    public SearchByIngredientDTO listRecipesByIngredients(List<Ingredient> ingredientList) {
        validateReceivedIngredients(ingredientList);
        log.debug("Search Recipes by {} ingredient", ingredientList.size());
        Set<Recipe> foundRecipes = new HashSet<>();
        ingredientList.forEach(ingredient ->
                foundRecipes.addAll(recipeRepository.findAllRecipesContainingIngredient(ingredient.getId())));
        SearchByIngredientDTO response = new SearchByIngredientDTO();
        List<Recipe> withAllIngredient = foundRecipes.stream().filter(recipe ->
                ingredientList.containsAll(recipe.getIngredients().stream().map(AmountOfIngredient::getIngredient)
                        .collect(Collectors.toList()))).collect(Collectors.toList());
        response.setRecipesWithAllIngredient(withAllIngredient);
        log.debug("Found {} recipes which contains all received Ingredient", withAllIngredient.size());
        List<Recipe> remainingRecipes = foundRecipes.stream()
                .filter(element -> !withAllIngredient.contains(element))
                .collect(Collectors.toList());
        List<Recipe> withAlmostAllIngredient = new ArrayList<>();
        long sameIngredientCount = 0;
        for (Recipe recipe : remainingRecipes) {
            for (AmountOfIngredient amountOfIngredient : recipe.getIngredients()) {
                sameIngredientCount += ingredientList.stream().filter(ingredient -> ingredient.getId().equals(amountOfIngredient.getIngredient().getId())).count();
            }
            if (sameIngredientCount >= recipe.getIngredients().size() / 2) {
                withAlmostAllIngredient.add(recipe);
            }
            sameIngredientCount = 0;
        }
        log.debug("Found {} recipes which contains more than the half Ingredient from the received list.", withAlmostAllIngredient.size());
        response.setRecipesWithAlmostAllIngredient(withAlmostAllIngredient);
        List<Recipe> withMinimumOneIngredient = remainingRecipes.stream()
                .filter(element -> !withAlmostAllIngredient.contains(element))
                .collect(Collectors.toList());
        response.setRecipesWithMinimumOneIngredient(withMinimumOneIngredient);
        log.debug("Found {} recipes which contains minimum 1 Ingredient from the received list.", withMinimumOneIngredient.size());
        return response;
    }

    public List<Recipe> listRecipesByCriteria(SearchByCriteriaDTO searchByCriteriaDTO) {
        validateSearchByCriteriaDTO(searchByCriteriaDTO);
        Stream<Recipe> foundRecipes = null;
        if (StringUtils.hasText(searchByCriteriaDTO.getName())) {
            foundRecipes = recipeRepository.findByNameContaining(searchByCriteriaDTO.getName()).stream();
        }
        if (searchByCriteriaDTO.getPreparationTimeInterval() != null) {
            List<Double> interval = searchByCriteriaDTO.getPreparationTimeInterval();
            if (foundRecipes == null) {
                foundRecipes = recipeRepository.findByPreparationTimeBetween(interval.get(0), interval.get(1)).stream();
            } else {
                foundRecipes = foundRecipes.filter(recipe ->
                        recipe.getPreparationTime() >= interval.get(0)
                                && recipe.getPreparationTime() <= interval.get(1));
            }
        }
        if (StringUtils.hasText(searchByCriteriaDTO.getDifficulty())) {
            if (foundRecipes == null) {
                foundRecipes = recipeRepository.findByDifficulty(translateDifficulty(searchByCriteriaDTO.getDifficulty())).stream();
            } else {
                foundRecipes = foundRecipes.filter(recipe ->
                        recipe.getDifficulty().equals(translateDifficulty(searchByCriteriaDTO.getDifficulty())));
            }
        }
        if (searchByCriteriaDTO.getCategories() != null) {
            if (foundRecipes == null) {
                foundRecipes = recipeRepository.findByCategoriesName(searchByCriteriaDTO.getCategories().get(0)).stream();
            }
            foundRecipes = foundRecipes.filter(recipe ->
                    recipe.getCategories().stream().map(Category::getName).collect(Collectors.toList())
                            .containsAll(searchByCriteriaDTO.getCategories()));
        }
        if (searchByCriteriaDTO.getHasPicture() != null) {
            if (foundRecipes == null) {
                if (searchByCriteriaDTO.getHasPicture()) {
                    foundRecipes = recipeRepository.findByImageFileNameNotContaining("defaultImage.png").stream();
                } else {
                    foundRecipes = recipeRepository.findByImageFileName("defaultImage.png").stream();
                }
            } else {
                if (searchByCriteriaDTO.getHasPicture()) {
                    foundRecipes = foundRecipes.filter(recipe -> !recipe.getImage().getFileName().equals("defaultImage.png"));
                } else {
                    foundRecipes = foundRecipes.filter(recipe -> recipe.getImage().getFileName().equals("defaultImage.png"));
                }
            }
        }
        List<Recipe> response = foundRecipes.collect(Collectors.toList());
        log.debug("Found {} recipe by criteria", response.size());
        return sortRecipesByName(response);
    }

    public void recommendARecipe(String recommend, String id) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new ValidationException("Nincs ilyen ID-val rendelkez?? recept!"));
        Integer recommendations = recipe.getRecommendations();
        if (recommendations == null) {
            recommendations = 0;
        }

        if (recommend.equalsIgnoreCase("plus")) {
            recipeRepository.save(recipe.toBuilder()
                    .recommendations(recommendations + 1)
                    .build());
        }
        if (recommend.equalsIgnoreCase("minus")) {
            recipeRepository.save(recipe.toBuilder()
                    .recommendations(recommendations - 1 < 0 ? null : recommendations - 1)
                    .build());
        }
    }

    public List<MostRecommendedRecipeDTO> listMostRecommendedRecipes() {
        Page<Recipe> recipePage = recipeRepository.findAll(PageRequest.of(0, MOST_RECOMMENDED_RECIPE_NUMBER, Sort.by(Sort.Direction.DESC, "recommendations")));
        List<Recipe> foundRecipes = recipePage.toList();
        List<MostRecommendedRecipeDTO> mostRecommendedRecipes = foundRecipes.stream().map(recipe ->
                MostRecommendedRecipeDTO.builder()
                        .id(recipe.getId())
                        .name(recipe.getName())
                        .description(recipe.getDescription())
                        .recommendations(recipe.getRecommendations())
                        .image(recipe.getImage())
                        .build()).collect(Collectors.toList());
        log.debug("Return the most recommended recipes.");
        return mostRecommendedRecipes;
    }

    private void validateSearchByCriteriaDTO(SearchByCriteriaDTO searchByCriteriaDTO) {
        log.debug("Validating searchByCriteriaDTO");
        if (searchByCriteriaDTO.getHasPicture() == null && searchByCriteriaDTO.getName() == null
                && searchByCriteriaDTO.getDifficulty() == null && searchByCriteriaDTO.getCategories() == null
                && searchByCriteriaDTO.getPreparationTimeInterval() == null) {
            throw new ValidationException("Keres??si felt??tel megad??sa k??telez??!");
        }
    }

    private List<Recipe> sortRecipesByName(List<Recipe> recipeList) {
        log.debug("Sorting response recipeList when filtering by Criteria.");
        RuleBasedCollator myCollator = (RuleBasedCollator) Collator.getInstance(new Locale("hu", "HU"));
        recipeList.sort((r1, r2) -> myCollator.compare(r1.getName(), r2.getName()));
        return recipeList;
    }

    private String translateUnit(Measurement measurement, String unit) {
        ValidationException exception = new ValidationException("Nem megfelel?? alapegys??g!");
        switch (measurement.getHungarianTranslation()) {
            case "B??gre":
                return Arrays.stream(MeasurementCup.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            case "T??meg":
                return Arrays.stream(MeasurementQuantity.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            case "T??rfogat":
                return Arrays.stream(MeasurementVolume.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            case "Darab":
                return Arrays.stream(MeasurementPiece.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            case "Kan??l":
                return Arrays.stream(MeasurementSpoon.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            case "Egy??b":
                return Arrays.stream(MeasurementOther.values()).filter(u -> u.getHungarianTranslation().equals(unit)).findFirst().orElseThrow(() -> exception).toString();
            default:
                throw exception;
        }
    }

    private void validateReceivedIngredients(List<Ingredient> ingredientList) {
        if (ingredientList.stream().anyMatch(ingredient -> ingredientRepository.findById(ingredient.getId()).isEmpty())) {
            throw new MissingIDException("Nincs ilyen ID-val rendelkez?? hozz??val??!");
        }
    }

    private Difficulty translateDifficulty(String difficulty) {
        log.debug("Translate difficulty to ENUM");
        if (Difficulty.EASY.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.EASY;
        } else if (Difficulty.MEDIUM.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.MEDIUM;
        } else if (Difficulty.HARD.getHungarianTranslation().equals(difficulty)) {
            return Difficulty.HARD;
        } else {
            throw new ValidationException("Nem megfelel?? neh??zs??gi szint!");
        }
    }

    @SneakyThrows
    private void validate(RecipeDTO recipeDTO) {
        log.debug("Validate Recipe");
        if (!StringUtils.hasText(recipeDTO.getName())) {
            throw new ValidationException("A recept nev??t k??telez?? megadni!");
        }
        if (!StringUtils.hasText(recipeDTO.getDescription())) {
            throw new ValidationException("A le??r??s mez?? nem lehet ??res!");
        }
        if (recipeDTO.getPreparationTime() <= 0) {
            throw new ValidationException("Az elk??sz??t??si id?? nem lehet 0 vagy ann??l kisebb!");
        }
        if (recipeDTO.getDifficulty() == null) {
            throw new ValidationException("Neh??zs??gi szint megad??sa k??telez??!");
        }
        if (CollectionUtils.isEmpty(recipeDTO.getIngredients())) {
            throw new ValidationException("Hozz??val??k megad??sa k??telez??!");
        }
        if (CollectionUtils.isEmpty(recipeDTO.getCategories())) {
            throw new ValidationException("Kateg??ria megad??sa k??telez??!");
        }
    }
}

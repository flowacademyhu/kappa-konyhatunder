package hu.flowacademy.konyhatunder.bootstrap;

import hu.flowacademy.konyhatunder.enums.*;
import hu.flowacademy.konyhatunder.exception.MissingIDException;
import hu.flowacademy.konyhatunder.model.*;
import hu.flowacademy.konyhatunder.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class InitDataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final AmountOfIngredientRepository amountOfIngredientRepository;
    private final ImageRepository imageRepository;
    private Image meatSoupImage;

    @Autowired
    public InitDataLoader(CategoryRepository categoryRepository, IngredientRepository ingredientRepository, RecipeRepository recipeRepository, AmountOfIngredientRepository amountOfIngredientRepository, ImageRepository imageRepository) {
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;
        this.recipeRepository = recipeRepository;
        this.amountOfIngredientRepository = amountOfIngredientRepository;
        this.imageRepository = imageRepository;
    }


    @Transactional(propagation = Propagation.SUPPORTS)
    @Override
    public void run(String... args) {
        log.info("Starting init data loader...");
        if (recipeRepository.count() == 0) {
            try {
                saveDefaultImage();
                saveMeatSoupImage();
                meatSoupAmountOfIngredients();
            } catch (Exception e) {
                log.warn("Something went wrong in InitDataLoader.");
            }
        }
    }

    private Recipe saveDefaultMeatSoup() {
        Recipe meatSoup = Recipe.builder()
                .name("Húsleves cérnametélttel")
                .image(meatSoupImage)
                .preparationTime(120)
                .categories(categoryRepository.saveAll(List.of(
                        Category.builder()
                                .name("Magyar")
                                .build(),
                        Category.builder()
                                .name("Leves")
                                .build()
                )))
                .difficulty(Difficulty.EASY)
                .description("A sárgarépát, a fehérrépát, a zellert, a karalábét, valamint a vöröshagymát meghámozzuk. A répákat hasábokra vágjuk. A konyhakész csirkét megmossuk, darabokra vágjuk.\n" +
                        "Mindent egy nagyobb lábasba tesszük, és kissé megpirítjuk. Meghintjük pirospaprikával és felöntjük annyi vízzel, hogy ellepje, sózzuk és hozzáadunk néhány szem fekete borsot. Felforraljuk, majd mérsékeljük a hőt, és félig lefedve kb. 1,5-2 óra alatt készre főzzük a levest. Ha nagyon elfővi a levét, vízzel pótoljuk, és megkóstoljuk, hogy elég sós-e.\n" +
                        "A cérnametéltet forrásban lévő sós vízben kifőzzük. Leszűrjük és szétosztjuk a tányérokba. Mindbe egy kevés zöldséget és egy-egy darab húst is teszünk. Végül rászűrjük a forró levest. Aprított petrezselyemmel tálaljuk.")
                .build();

        log.info("Saved {} recipe.", meatSoup.getName());
        return recipeRepository.save(meatSoup);
    }

    private List<Ingredient> meatSoupIngredients() {
        log.info("Saved meatsoup ingredients");
        return ingredientRepository.saveAll(
                List.of(
                        Ingredient.builder()
                                .name("Egész csirke")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Sárgarépa")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Fehérrépa")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Zeller")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Karalábé")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Vöröshagyma")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Víz")
                                .measurement(Measurement.VOLUME)
                                .build(),
                        Ingredient.builder()
                                .name("Só")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Egész bors")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Cérnametélt")
                                .measurement(Measurement.QUANTITY)
                                .build()
                )
        );
    }

    private void meatSoupAmountOfIngredients() {
        MissingIDException exception = new MissingIDException("Nincs ilyen hozzávaló");
        List<Ingredient> ingredients = meatSoupIngredients();
        Recipe meatSoup = saveDefaultMeatSoup();
        amountOfIngredientRepository.saveAll(List.of(
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Cérnametélt")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(10)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Egész csirke")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Sárgarépa")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(4)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Fehérrépa")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(2)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Zeller")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Karalábé")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Vöröshagyma")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Víz")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementVolume.L.toString())
                        .amount(4)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Só")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TABLE_SPOON.toString())
                        .amount(2)
                        .recipe(meatSoup)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Egész bors")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TABLE_SPOON.toString())
                        .amount(1)
                        .recipe(meatSoup)
                        .build()
                )
        );
        log.info("Saved meatsoup AmountOfIngredients");

    }

    private void saveMeatSoupImage() {
        try {
            BufferedImage bImage = ImageIO.read(new File("/app/husleves.jpg"));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(bImage, "jpg", bos);
            byte[] data = bos.toByteArray();
            Image image = new Image("meatSoup.jpg", "image/jpg", data);
            meatSoupImage = imageRepository.save(image);
            log.info("Saved an image for meatSoup");
        } catch (IOException e) {
            log.error("Error while reading meatsoup image.");
        }
    }

    private void saveDefaultImage() {
        try {
            BufferedImage bImage = ImageIO.read(new File("/app/defaultimage.png"));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(bImage, "png", bos);
            byte[] data = bos.toByteArray();
            Image image = new Image("defaultImage.png", "image/png", data);
            imageRepository.save(image);
            log.info("Saved a default image");
        } catch (IOException e) {
            log.error("Error while reading default image.");
        }
    }
}

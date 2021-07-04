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
    private Image stewImage;
    private Image pizzaImage;

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
                saveStewImage();
                stewAmountOfIngredients();
                savePizzaImage();
                pizzaAmountOfIngredients();
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
                .description("A sárgarépát, a fehérrépát, a zellert, a karalábét, valamint a vöröshagymát meghámozzuk. A répákat hasábokra vágjuk. A konyhakész csirkét megmossuk, darabokra vágjuk.\n\n" +
                        "Mindent egy nagyobb lábasba tesszük, és kissé megpirítjuk. Meghintjük pirospaprikával és felöntjük annyi vízzel, hogy ellepje, sózzuk és hozzáadunk néhány szem fekete borsot. Felforraljuk, majd mérsékeljük a hőt, és félig lefedve kb. 1,5-2 óra alatt készre főzzük a levest. Ha nagyon elfővi a levét, vízzel pótoljuk, és megkóstoljuk, hogy elég sós-e.\n\n" +
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

    private Recipe saveDefaultStew() {
        Recipe stew = Recipe.builder()
                .name("Csirkemell pörkölt tésztával")
                .image(stewImage)
                .preparationTime(45)
                .categories(categoryRepository.saveAll(List.of(
                        categoryRepository.findByName("Magyar"),
                        Category.builder()
                                .name("Gyors")
                                .build(),
                        Category.builder()
                                .name("Főétel")
                                .build()

                )))
                .difficulty(Difficulty.EASY)
                .description("A csirkemellet kockára vágjuk, a vöröshagymát megtisztíjuk és apróra vágjuk. \n\n" +
                        "A felforrósított olajon megpároljuk a vöröshagymát, amikor kezd üvegesedni hozzáadjuk a negyedekbe vágott paradicsomot és a paprikát és együtt pároljuk. Hozzáadjuk a csirkemellet és fehéredésig sütjük. \n\n" +
                        "A tűzről levéve megszórjuk a pirospaprikával, sózzuk, borsozzuk. Ráöntjük a vizet, majd visszatesszük a tűzre és fedő alatt 25-30 perc alatt puhára főzzük.\n\n" +
                        "A tésztát a csomagoláson található előírás szerint lobogó, forró vízben kifőzzük és leszűrjük. ")
                .build();

        log.info("Saved {} recipe.", stew.getName());
        return recipeRepository.save(stew);
    }

    private List<Ingredient> stewIngredients() {
        log.info("Saved stew ingredients");
        return ingredientRepository.saveAll(
                List.of(
                        Ingredient.builder()
                                .name("Csirkemell")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Bors")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Paradicsom")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Paprika")
                                .measurement(Measurement.PIECE)
                                .build(),
                        Ingredient.builder()
                                .name("Őrölt pirospaprika")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Étolaj")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Fussili tészta")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        ingredientRepository.findByNameAndMeasurement("Só", Measurement.SPOON),
                        ingredientRepository.findByNameAndMeasurement("Víz", Measurement.VOLUME),
                        ingredientRepository.findByNameAndMeasurement("Vöröshagyma", Measurement.PIECE)
                )
        );
    }

    private void stewAmountOfIngredients() {
        MissingIDException exception = new MissingIDException("Nincs ilyen hozzávaló");
        List<Ingredient> ingredients = stewIngredients();
        Recipe stew = saveDefaultStew();
        amountOfIngredientRepository.saveAll(List.of(
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Csirkemell")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.KG.toString())
                        .amount(0.5)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Bors")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Víz")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementVolume.DL.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Só")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(2)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Vöröshagyma")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Étolaj")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TABLE_SPOON.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Paradicsom")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Paprika")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementPiece.PIECE.toString())
                        .amount(1)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Őrölt pirospaprika")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(2)
                        .recipe(stew)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Fussili tészta")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(50)
                        .recipe(stew)
                        .build()
                )
        );
        log.info("Saved stew AmountOfIngredients");
    }

    private void saveStewImage() {
        try {
            BufferedImage bImage = ImageIO.read(new File("/app/porkolt.jpg"));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(bImage, "jpg", bos);
            byte[] data = bos.toByteArray();
            Image image = new Image("porkolt.jpg", "image/jpg", data);
            stewImage = imageRepository.save(image);
            log.info("Saved an image for stew");
        } catch (IOException e) {
            log.error("Error while reading stew image.");
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

    private Recipe saveDefaultPizza() {
        Recipe pizza = Recipe.builder()
                .name("Paradicsomos mozzarellás pizza")
                .image(pizzaImage)
                .preparationTime(60)
                .categories(categoryRepository.saveAll(List.of(
                        categoryRepository.findByName("Gyors"),
                        categoryRepository.findByName("Főétel"),
                        Category.builder()
                                .name("Olasz")
                                .build()
                )))
                .difficulty(Difficulty.HARD)
                .description("Összedolgozzuk a finomlisztet a kukoricaliszttel, sóval, porcukorral, a szárított élesztővel, olívaolajjal és kb. 1,7 dl langyos vízzel. Tiszta ruhával letakarjuk, és kb. 45 percig kelesztjük a tésztát.\n\n" +
                        "\n\n" +
                        "Belisztezett deszkán 10 részre osztjuk a tésztát, majd a tésztadarabokat lepény formájúra nyújtjuk. A bazsalikomot leöblítjük. Néhány levelet félrerakunk, a többit felaprítjuk. A paradicsompüréhez keverjük a bazsalikomot, némi sót, és megkenjük vele a lepényeket, majd sütőpapírral kibélelt tepsire tesszük őket, és 200 fokra előmelegített sütőbe toljuk 10 percre.\n\n" +
                        "\n\n" +
                        "A pizzákon elosztjuk a koktélparadicsomot, valamint a mozzarellagolyót, és még néhány percig sütjük. A félretett bazsalikomlevelekkel díszítve kínáljuk.")
                .build();

        log.info("Saved {} recipe.", pizza.getName());
        return recipeRepository.save(pizza);
    }

    private List<Ingredient> pizzaIngredients() {
        log.info("Saved pizza ingredients");
        return ingredientRepository.saveAll(
                List.of(
                        Ingredient.builder()
                                .name("Finomliszt")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Kukoricaliszt")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Porcukor")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Szárított élesztő")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Olívaolaj")
                                .measurement(Measurement.SPOON)
                                .build(),
                        Ingredient.builder()
                                .name("Bazsalikom")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Paradicsompüré")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Koktélparadicsom")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        Ingredient.builder()
                                .name("Mozzarella")
                                .measurement(Measurement.QUANTITY)
                                .build(),
                        ingredientRepository.findByNameAndMeasurement("Só", Measurement.SPOON),
                        ingredientRepository.findByNameAndMeasurement("Víz", Measurement.VOLUME)
                        )
        );
    }

    private void pizzaAmountOfIngredients() {
        MissingIDException exception = new MissingIDException("Nincs ilyen hozzávaló");
        List<Ingredient> ingredients = pizzaIngredients();
        Recipe pizza = saveDefaultPizza();
        amountOfIngredientRepository.saveAll(List.of(
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Finomliszt")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(20)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Kukoricaliszt")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(5)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Só")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(0.5)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Szárított élesztő")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(1)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Porcukor")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TEA_SPOON.toString())
                        .amount(0.5)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Olívaolaj")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementSpoon.TABLE_SPOON.toString())
                        .amount(2)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Bazsalikom")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(2)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Paradicsompüré")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(12)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Koktélparadicsom")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.KG.toString())
                        .amount(0.5)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Mozzarella")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementQuantity.DKG.toString())
                        .amount(40)
                        .recipe(pizza)
                        .build(),
                AmountOfIngredient.builder()
                        .ingredient(ingredients.stream().filter(i -> i.getName().equals("Víz")).findFirst().orElseThrow(() -> exception))
                        .unit(MeasurementVolume.DL.toString())
                        .amount(1.7)
                        .recipe(pizza)
                        .build()
                )
        );
        log.info("Saved stew AmountOfIngredients");
    }

    private void savePizzaImage() {
        try {
            BufferedImage bImage = ImageIO.read(new File("/app/pizza.jpg"));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(bImage, "jpg", bos);
            byte[] data = bos.toByteArray();
            Image image = new Image("pizza.jpg", "image/jpg", data);
            pizzaImage = imageRepository.save(image);
            log.info("Saved an image for pizza");
        } catch (IOException e) {
            log.error("Error while reading pizza image.");
        }
    }
}

package hu.flowacademy.konyhatunder.model;

import hu.flowacademy.konyhatunder.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    private String id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Level level;
    @OneToMany(mappedBy = "recipe")
    private List<AmountOfIngredientForARecipe> amountOfIngredientForARecipeList;
    @ManyToMany
    @JoinTable(
            name = "recipe_category",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categoryList;
    private String description;
    private double preparationTime;
}

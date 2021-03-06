package hu.flowacademy.konyhatunder.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import hu.flowacademy.konyhatunder.enums.Difficulty;
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
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @OneToMany(mappedBy = "recipe")
    private List<AmountOfIngredient> ingredients;
    @ManyToMany
    @JoinTable(
            name = "recipe_category",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;
    @Column(length = 10000)
    private String description;
    private double preparationTime;
    @ManyToOne
    private Image image;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer recommendations;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @OneToMany(mappedBy ="recipe")
    private List<Comment> comments;
}

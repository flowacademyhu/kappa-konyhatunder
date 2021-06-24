package hu.flowacademy.konyhatunder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Category {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @JsonIgnore
    private String id;
    @Column(unique = true)
    private String name;
    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private List<Recipe> recipeList;

    public Category(String name) {
        this.name = name;
    }
}

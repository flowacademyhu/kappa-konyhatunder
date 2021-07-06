package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.dto.CommentDTO;
import hu.flowacademy.konyhatunder.exception.ValidationException;
import hu.flowacademy.konyhatunder.model.Comment;
import hu.flowacademy.konyhatunder.model.Recipe;
import hu.flowacademy.konyhatunder.repository.CommentRepository;
import hu.flowacademy.konyhatunder.repository.RecipeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
public class CommentService {

    public final RecipeRepository recipeRepository;
    public final CommentRepository commentRepository;

    @Autowired
    public CommentService(RecipeRepository recipeRepository, CommentRepository commentRepository) {
        this.recipeRepository = recipeRepository;
        this.commentRepository = commentRepository;
    }

    public Comment commentARecipe(CommentDTO commentDTO, String recipeId) {
        log.info("Received a comment for this recipe: {}", recipeId);
        if (!StringUtils.hasText(commentDTO.getText())) {
            throw new ValidationException("Komment szöveg megadása kötelező!");
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new ValidationException("Nincs ilyen ID-val rendelkező recept!"));
        Comment comment = Comment.builder()
                .text(commentDTO.getText())
                .recipe(recipe)
                .timeStamp(LocalDateTime.now())
                .build();
        Comment savedComment = commentRepository.save(comment);
        log.debug("Created comment: {}", savedComment);
        return savedComment;
    }
}

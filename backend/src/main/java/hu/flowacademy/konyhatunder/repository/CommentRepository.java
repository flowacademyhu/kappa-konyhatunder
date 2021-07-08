package hu.flowacademy.konyhatunder.repository;

import hu.flowacademy.konyhatunder.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,String> {
}

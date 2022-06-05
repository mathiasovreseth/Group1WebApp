package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * The interface Review repository.
 */
public interface ReviewRepository extends CrudRepository<Review, Long> {
    Optional<Review> findById(Long id);

    @Query(value = "SELECT reviews.id, users.name, comment from reviews inner join products_reviews pr on reviews.id = pr.reviews_id inner join users_reviews ur on reviews.id = ur.reviews_id inner join users on ur.user_id = users.id",
            nativeQuery = true)
    List<Object[]> getCommentAndUser();
}

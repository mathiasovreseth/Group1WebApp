package no.ntnu.group1.webApp.repositories;
import no.ntnu.group1.webApp.models.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * The interface Review repository.
 */
public interface ReviewRepository extends CrudRepository<Review, Long> {
  Optional<Review> findById(Long id);
}

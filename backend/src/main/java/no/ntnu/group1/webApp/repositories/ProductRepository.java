package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * The Product repository interface.
 */
public interface ProductRepository extends CrudRepository<Product, Long> {
    Optional<Product> findById(Long id);
}

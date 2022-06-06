package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * The User repository interface.
 */
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findById(Long id);

    /**
     * Find user by email.
     *
     * @param email the email of the user
     * @return the user if present
     */
    Optional<User> findByEmail(String email);

    /**
     * Gets user status.
     *
     * @param id the id of the user
     * @return the user status
     */
    @Query("SELECT enabled FROM User WHERE id = :id")
    boolean getUserStatus(@Param("id") Long id);
}

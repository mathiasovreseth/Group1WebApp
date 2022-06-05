package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    @Query("SELECT enabled FROM User WHERE id = :id")
    boolean getUserStatus(@Param("id") Long id);
}

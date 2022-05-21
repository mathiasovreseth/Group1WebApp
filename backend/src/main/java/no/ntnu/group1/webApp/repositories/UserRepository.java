package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByName(String name);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    Optional<User> findByToken(String token);


}

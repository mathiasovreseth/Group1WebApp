package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
<<<<<<< HEAD
    Optional<User> findByEmail(String email);
    Optional<User> findByToken(String token);
=======
//    Optional<User> findByEmail(String email);

>>>>>>> ea1564f17bddc06238c6df156e2d7e8e013e839c
}

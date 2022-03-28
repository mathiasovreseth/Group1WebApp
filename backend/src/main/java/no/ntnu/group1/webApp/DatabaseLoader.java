package no.ntnu.group1.webApp;

import no.ntnu.group1.webApp.models.Roles;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public DatabaseLoader(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new User("Frodo", "Baggins", "ring bearer", Roles.USER));
    }
}

package no.ntnu.group1.webApp.service;


import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.UserRepository;
import no.ntnu.group1.webApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class LoginService {

    final private UserRepository userRepository;
    final private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    public LoginService(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * Gets optional with user and sets new token on correct email and password combination.
     * Empty optional on failure.
     *
     * @param email    User's email.
     * @param password User's password.
     * @return Optional of user on success, empty optional on failure.
     */
    public Optional<User> login(String email, String password) {
        Optional<User> foundUser = userRepository.findByEmail(email);

        boolean userIsEnabled = userRepository.getUserStatus(foundUser.get().getId());
        if (foundUser.isPresent() && userIsEnabled) {
            User user = foundUser.get();

            // Checking if password given by client matches password for user.
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Creates new token for user on successful login.
                String token = jwtUtil.generateToken(user);
                user.setToken(token);
                userRepository.save(user);
                return Optional.of(user);
            } else {
                return Optional.empty();
            }
        }
        return Optional.empty();
    }

}

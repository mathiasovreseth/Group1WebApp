package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

/**
 * Represents the user service of the application.
 */
@Service
public class UserService {

    final private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Instantiates a new User service.
     *
     * @param passwordEncoder the password encoder
     */
    UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Finds user by email.
     *
     * @param email the email of the user
     * @return the user if present
     */
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Finds user by id.
     *
     * @param id the id of the user
     * @return the user if present
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Update user.
     *
     * @param userToUpdate the user to update
     * @param name         the name
     * @param email        the email
     * @param role         the role
     * @param enabled      the status of the user
     * @param password     the password of the user
     * @return {@code true} if successful, {@code false} if not successful
     */
    public boolean updateUser(User userToUpdate, String name, String email, String role, Boolean enabled, String password) {
        userToUpdate.setName(name);
        userToUpdate.setEmail(email);
        userToUpdate.setRole(role);
        userToUpdate.setEnabled(enabled);

        if (!password.isEmpty()) {
            userToUpdate.setPassword(passwordEncoder.encode(password));
        }
        try {
            userRepository.save(userToUpdate);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Disables a user.
     *
     * @param id      the id of the user
     * @param enabled the status of the user
     * @return {@code true} if successful, {@code false} if not successful
     */
    @Transactional
    public boolean disableUser(String id, Boolean enabled) {
        String sql = "update users set enabled=" + enabled + " where id=" + id;
        entityManager.joinTransaction();
        int nrOfUpdatedTables = entityManager.createNativeQuery(sql).executeUpdate();
        return nrOfUpdatedTables == 1;
    }


    /**
     * Gets all users.
     *
     * @return all users
     */
    public List<User> getAll() {
        return (List<User>) userRepository.findAll();
    }


    /**
     * Add user to the repository.
     *
     * @param user the user to be added to the repository
     */
    public void addUser(User user) {
        userRepository.save(user);
    }
}

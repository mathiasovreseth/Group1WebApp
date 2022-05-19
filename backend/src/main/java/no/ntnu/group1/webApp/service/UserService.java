package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
   }
   @Modifying
   public void updateUser(String id, String email, String password) {

       String query = "ALTER TABLE `" + "users" + "` SET `" + "email = heisann" + "` " +
                " WHERE `" + "id = 1" + "`";

       System.out.println(query);
       entityManager.createNativeQuery(query).executeUpdate();



    }

  /**

    public Optional<User> findByName(String name) {
        return userRepository.findByName(name);
    }
   */

    public List<User> getAll() {
        return (List<User>) userRepository.findAll();
    }
    public Optional<User> findByToken(String token) {
        return userRepository.findByToken(token);
    }

    public void addUser(User user) {
        userRepository.save(user);
    }
    public void removeUser(User user){
        userRepository.delete(user);
    }

}

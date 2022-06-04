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

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @PersistenceContext
  private EntityManager entityManager;

  final private PasswordEncoder passwordEncoder;

  UserService(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public boolean updateUser(User userToUpdate, String name, String email, String role, Boolean enabled, String password) {
    userToUpdate.setName(name);
    userToUpdate.setEmail(email);
    userToUpdate.setRole(role);
    userToUpdate.setEnabled(enabled);

    if(!password.isEmpty()) {
      userToUpdate.setPassword(passwordEncoder.encode(password));
    }
    try {
      userRepository.save(userToUpdate);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @Transactional
  public boolean disableUser(String id, Boolean enabled) {
    String sql = "update users set enabled=" + enabled + " where id=" + id;
    entityManager.joinTransaction();
    int nrOfUpdatedTables = entityManager.createNativeQuery(sql).executeUpdate();
    return nrOfUpdatedTables == 1;
  }


  public List<User> getAll() {
    return (List<User>) userRepository.findAll();
  }


  public void addUser(User user) {
    userRepository.save(user);
  }


}

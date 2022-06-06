package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.security.AuthenticationResponse;
import no.ntnu.group1.webApp.service.LoginService;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Represents the authentication controller of the application.
 */
@CrossOrigin
@RestController
public class AuthController {
  final private UserService userService;
  final private PasswordEncoder passwordEncoder;
  final private LoginService loginService;

  public AuthController(UserService userService,
                        PasswordEncoder passwordEncoder,
                        LoginService loginservice) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
    this.loginService = loginservice;
  }

  /**
   * Provides user token on correct login.
   *
   * @param http Http data
   * @return ResponseEntity containing user's token, or empty 404 status on incorrect login/missing user.
   */
  @CrossOrigin
  @PostMapping("/api/auth/login")
  ResponseEntity<?> login(HttpEntity<String> http) {
    try {
      JSONObject json = new JSONObject(http.getBody());
      String email = json.getString("email");
      String password = json.getString("password");
      String token = loginService.login(email, password);

      if(token.equals("401")) {
        return new ResponseEntity("Email or password is incorrect", HttpStatus.UNAUTHORIZED);

      } else if(token.equals("404")) {
        return new ResponseEntity("User was not found", HttpStatus.NOT_FOUND);
      }
      return new ResponseEntity(new AuthenticationResponse(token), HttpStatus.OK);
    } catch (JSONException e) {
      return new ResponseEntity("Field is missing in the request", HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Registers a new user with set departments.
   * Request body needs to be JSONObject in this format:
   * {
   * "username": "String with username",
   * "email": "user@email.com",
   * "password": "password",
   * }
   *
   * @param entity Http data
   * @return ResponseEntity
   */
  @CrossOrigin
  @PostMapping("/api/auth/register")
  public ResponseEntity<?> registerUser(HttpEntity<String> entity) {
    try {
      JSONObject json = new JSONObject(entity.getBody());

      String name = json.getString("name");
      String email = json.getString("email");
      String password = json.getString("password");

      if (userService.findUserByEmail(email).isPresent()) {
        return new ResponseEntity("User already exists",HttpStatus.CONFLICT);
      }
      User user = new User(name, email, passwordEncoder.encode(password));
      userService.addUser(user);
      return new ResponseEntity("User successfully registered", HttpStatus.OK);
    } catch (JSONException e) {
      return new ResponseEntity("Field(s) is missing in the request", HttpStatus.BAD_REQUEST);
    }
  }

}

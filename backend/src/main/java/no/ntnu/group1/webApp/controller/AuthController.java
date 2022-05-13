package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.security.JwtUtil;
import no.ntnu.group1.webApp.service.LoginService;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

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
     * @param http HttpEntity of request.
     * @return ResponseEntity containing user's token, or empty 404 status on incorrect login/missing user.
     */
    @PostMapping("/api/auth/login")
    ResponseEntity<String> login(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());

            String email = json.getString("email");
            String password = json.getString("password");

            Optional<User> userOptional = loginService.login(email, password);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user.getToken());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (JSONException e) {
            return ResponseEntity.badRequest().build();
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
     * @param entity HttpEntity of request
     * @return ResponseEntity
     */
    @PostMapping("/api/auth/register")
    public ResponseEntity<String> registerUser(HttpEntity<String> entity) {
        try {
            JSONObject json = new JSONObject(entity.getBody());

            String name = json.getString("name");
            String email = json.getString("email");
            String password = json.getString("password");

            if (userService.findUserByEmail(email).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            User user = new User(name, email, passwordEncoder.encode(password));
            userService.addUser(user);

            return ResponseEntity.ok("User successfully registered.");
        } catch (JSONException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Confirm a user so they can login
     *
     * @param entity the email of the user to confirm
     * @return ResponseEntity the response ok or not
     */
    @PostMapping("/api/auth/confirmUser")
    public ResponseEntity<String> confirmUser(HttpEntity<String> entity) {
        try {
            JSONObject json = new JSONObject(entity.getBody());

            String email = json.getString("email");
            Optional<User> optionalUser = userService.findUserByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setEnabled(true);
            } else {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok("User " + email + " is now able to log in");
        } catch (JSONException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}

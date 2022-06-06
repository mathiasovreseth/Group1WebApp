package no.ntnu.group1.webApp.controller;

import lombok.extern.slf4j.Slf4j;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

/**
 * Represents the user controller of the application.
 */
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * Instantiates a new User controller.
     *
     * @param userService the user service
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Gets all users.
     *
     * @return the all users
     */
    @CrossOrigin
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    /**
     * Gets user by email.
     *
     * @param email the email
     * @return the user by email
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathParam("email")
                                                         @PathVariable("id") String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }


    /**
     * Disables the user account specified.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PutMapping("delete")
    public ResponseEntity<?> deleteUser(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");

            if (userService.disableUser(id, false)) {
                return ResponseEntity.ok("User disabled");
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Updates the user account specified.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PutMapping("update")
    public ResponseEntity<?> updateUser(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            String role = json.getString("userRole");
            String email = json.getString("email");
            String name = json.getString("name");
            Boolean enabled = json.getBoolean("enabled");
            String password = json.getString("password");
            Optional<User> userOptional = userService.findById(Long.parseLong(id));
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (userService.updateUser(user, name, email, role, enabled, password)) {
                    return ResponseEntity.ok("User updated");
                } else {
                    return ResponseEntity.internalServerError().build();
                }
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}

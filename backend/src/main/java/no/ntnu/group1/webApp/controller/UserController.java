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

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathParam("email")
                                                         @PathVariable("id") String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }


    @PostMapping("addUser")
    public ResponseEntity<User> addNewUser(HttpEntity<String> entity) {
        try {
            saveUserFromJsonObject(new JSONObject(entity.getBody()));
            return ResponseEntity.ok().build();
        } catch (JSONException e) {
            return ResponseEntity.badRequest().build();
        }
    }


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

    private void saveUserFromJsonObject(JSONObject jsonObject) throws JSONException {
        User user = User.fromJSONObject(jsonObject);
        userService.addUser(user);
    }
}

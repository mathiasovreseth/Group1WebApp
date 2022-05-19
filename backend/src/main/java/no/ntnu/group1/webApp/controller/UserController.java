package no.ntnu.group1.webApp.controller;

import lombok.extern.slf4j.Slf4j;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

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
        System.out.println("------------------------------------------");
        try {
            System.out.println(entity);
            saveUserFromJsonObject(new JSONObject(entity.getBody()));
            return ResponseEntity.ok().build();
        } catch (JSONException e) {
            System.out.println("------------------------------------------");
            return ResponseEntity.badRequest().build();
        }
    }
    @CrossOrigin
    @PostMapping("delete")
    public ResponseEntity<?> deleteUser(HttpEntity<String> http)  {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            Optional<User> userToRemove = userService.findById(new Long(id));
            if(userToRemove.isPresent()) {
                User user = userToRemove.get();
                userService.removeUser(user);
                return ResponseEntity.ok("User removed");
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping("update")
    public ResponseEntity<?> updateUser(HttpEntity<String> http)  {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String oldEmail = json.getString("oldEmail");
            String id = json.getString("id");
            String email = json.getString("email");
            String name = json.getString("name");
            String password = json.getString("password");

            Optional<User> userToEdit = userService.findUserByEmail(oldEmail);
            if(userToEdit.isPresent()) {
                User user = userToEdit.get();
                userService.updateUser(id,name,email, password);
                if(!password.isEmpty()) {
                    user.setPassword(password);
                }
                return ResponseEntity.ok("User edited");
            } else {
                return ResponseEntity.badRequest().build();
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

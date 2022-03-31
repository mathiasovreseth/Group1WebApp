package no.ntnu.group1.webApp.controller;

import net.minidev.json.JSONObject;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathParam("email") @PathVariable("id") String email){
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserByUsername(@PathParam("username") @PathVariable("id") String username){
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PostMapping("/addMember")
    public ResponseEntity<User> addUser(HttpEntity<String> entity) {
        try {
            saveNewMemberFromJsonObject(new JSONObject(entity.getBody()));
            return ResponseEntity.ok().build();
        } catch (JSONException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}

package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.UserService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.configurationprocessor.json.JSONObject;

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


    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathParam("email")
                                                         @PathVariable("id") String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserByUsername(@PathParam("username")
                                                            @PathVariable("id") String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }


    @PostMapping("addUser")
    public ResponseEntity<User> addNewUser(HttpEntity<String> entity){
        try{
            saveUserFromJsonObject(new JSONObject(entity.getBody()));
            return ResponseEntity.ok().build();
        }catch (JSONException e){
            return ResponseEntity.badRequest().build();
        }
    }

    private void saveUserFromJsonObject(JSONObject jsonObject) throws JSONException{
        User user = User.fromJSONObject(jsonObject);
        userService.addUser(user);
    }



}

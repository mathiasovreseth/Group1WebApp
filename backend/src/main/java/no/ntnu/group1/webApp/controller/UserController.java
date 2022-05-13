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


    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathParam("email")
                                                         @PathVariable("id") String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }


//todo funker ikke

//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<User>> getUserByName(@PathParam("name")
//                                                            @PathVariable("id") String name) {
//        return ResponseEntity.ok(userService.findByName(name));
//    }


    @PostMapping("addUser")
    public ResponseEntity<User> addNewUser(HttpEntity<String> entity){
        System.out.println("------------------------------------------");
        try{
            System.out.println(entity);
            saveUserFromJsonObject(new JSONObject(entity.getBody()));
            return ResponseEntity.ok().build();
        }catch (JSONException e){
            System.out.println("------------------------------------------");
            return ResponseEntity.badRequest().build();
        }
    }

    private void saveUserFromJsonObject(JSONObject jsonObject) throws JSONException{
        User user = User.fromJSONObject(jsonObject);
        userService.addUser(user);
    }



}

package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.OrderService;
import no.ntnu.group1.webApp.service.ProductService;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    public OrderController(OrderService orderService, UserService userService, ProductService productService) {
        this.orderService = orderService;
        this.userService = userService;
        this.productService = productService;
    }
    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<String> addNewOrder(HttpEntity<String> http) {
        JSONObject json = null;
        try {
            json = new JSONObject(http.getBody());
            String userEmail = json.getString("email");
            Long productId = json.getLong("productId");
            Long startDateTime = json.getLong("startDate");
            Long endDateTime = json.getLong("endDate");
            int attendees = json.getInt("attendees");
            String language = json.getString("language");

            Date startDate = new Date(startDateTime);
            Date endDate = new Date(endDateTime);

            Optional<User> userOptional = userService.findUserByEmail(userEmail);
            Optional<Product> productOptional = productService.findById(productId);

            if(userOptional.isPresent() && productOptional.isPresent()) {
                User user = userOptional.get();
                Product product = productOptional.get();
                Order order = new Order(user, product, new Date(), startDate, endDate,attendees, language);
                if(orderService.addNewOrder(order)) {
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                   return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeOrder(@PathVariable Long id){
        ResponseEntity<String> response;
        if(orderService.removeOrder(id)){
            response = new ResponseEntity<>(HttpStatus.OK);
        }else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @CrossOrigin
    @GetMapping("/getAll")
    public ResponseEntity<List<Order>> getAllOrders() {
        return  ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }


}

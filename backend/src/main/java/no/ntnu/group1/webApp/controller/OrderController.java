package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<String> addNewOrder(@RequestBody Order order) {
        ResponseEntity<String> response;
        if(orderService.addNewOrder(order)){
            response = new ResponseEntity<>(HttpStatus.OK);
        }else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
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

    @GetMapping("/getAll")
    public ResponseEntity<List<Order>> getAllOrders() {
        return  ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }
}

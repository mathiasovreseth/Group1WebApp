package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Order>> getAllOrders() {
        return  ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getOrderById(@PathParam("id") Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }
}

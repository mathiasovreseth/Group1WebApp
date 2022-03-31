package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.repositories.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private  final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}

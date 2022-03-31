package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private  final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAll() {
        return (List<Order>) orderRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

}

package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public boolean addNewOrder(Order order) {
        boolean added = false;
        if (canBeAdded(order)) {
            orderRepository.save(order);
            added = true;
        }
        return added;
    }

    public boolean removeOrder(Long orderId) {
        boolean removed = false;
        if (findById(orderId) != null) {
            orderRepository.deleteById(orderId);
            removed = true;
        }
        return removed;
    }

    public boolean update(Order order) {
        try {
            orderRepository.save(order);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    private boolean canBeAdded(Order order) {
        return order != null;
    }

    public List<Order> getAll() {
        return (List<Order>) orderRepository.findAll();
    }

    public boolean markAsProcessed(Long id) {
        Optional<Order> orderOptional = findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setProcessed(true);
            try {
                orderRepository.save(order);
                return true;
            } catch (IllegalArgumentException e) {
                return false;
            }
        } else {
            return false;
        }

    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }
}

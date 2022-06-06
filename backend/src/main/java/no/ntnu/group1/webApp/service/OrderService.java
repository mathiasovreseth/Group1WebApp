package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Represents the order service of the application.
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    /**
     * Add a new order.
     *
     * @param order the order to be added
     * @return {@code true} if successful, {@code false} if not successful
     */
    public boolean addNewOrder(Order order) {
        boolean added = false;
        if (canBeAdded(order)) {
            orderRepository.save(order);
            added = true;
        }
        return added;
    }

    private boolean canBeAdded(Order order) {
        return order != null;
    }

    /**
     * Gets all orders
     *
     * @return all orders
     */
    public List<Order> getAll() {
        return (List<Order>) orderRepository.findAll();
    }

    /**
     * Mark order as processed.
     *
     * @param id the id of the order
     * @return {@code true} if successful, {@code false} if not successful
     */
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



    /**
     * Find order by id.
     *
     * @param id the id of the order
     * @return the order if present
     */
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }
}

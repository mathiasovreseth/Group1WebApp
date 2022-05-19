package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.repositories.OrderRepository;
import no.ntnu.group1.webApp.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class OrderService {
    @Autowired

    private  OrderRepository orderRepository;

    public boolean addNewOrder(Order order){
        boolean added = false;
        if(canBeAdded(order)){
            orderRepository.save(order);
            added = true;
        }
        return added;
    }

    public boolean removeOrder (Long orderId) {
        boolean removed = false;
        if(findById(orderId) != null){
            orderRepository.deleteById(orderId);
            removed = true;
        }
        return removed;
    }

    public boolean update(Order order){
        try{
            orderRepository.save(order);
            return true;
        }catch (IllegalArgumentException e){
            return false;
        }
    }

    private boolean canBeAdded(Order order) {
        return order != null;
    }

    public List<Order> getAll() {
        return (List<Order>) orderRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

}

package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAll() {
        return (List<Product>) productRepository.findAll();
    }



}

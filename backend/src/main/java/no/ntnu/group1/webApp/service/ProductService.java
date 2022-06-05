package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAll() {
        return (List<Product>) productRepository.findAll();
    }

    public void removeProduct(String id) {
        Long convertedId = Long.valueOf(id);
        productRepository.deleteById(convertedId);
    }

    public void add(Product product) {
        productRepository.save(product);
    }

    public Optional<Product> findById(String id) {
        Long convertedId = Long.valueOf(id);
        return productRepository.findById(convertedId);
    }

    @Transactional
    public boolean updateProduct(String id, String title, String description) {
        String sql = "update products set title='" + title + "',description= '" + description + "' where id=" + id;
        entityManager.joinTransaction();
        int nrOfUpdatedTables = entityManager.createNativeQuery(sql).executeUpdate();
        return nrOfUpdatedTables == 1;
    }
}

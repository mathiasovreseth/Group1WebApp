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

/**
 * Represents the product service of the application.
 */
@Service
public class ProductService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    /**
     * Find product by id.
     *
     * @param id the id of the product
     * @return the product
     */
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Gets all products.
     *
     * @return all products
     */
    public List<Product> getAll() {
        return (List<Product>) productRepository.findAll();
    }

    /**
     * Removes a product from the repository.
     *
     * @param id the id of te product to be deleted
     */
    public void removeProduct(String id) {
        Long convertedId = Long.valueOf(id);
        productRepository.deleteById(convertedId);
    }

    /**
     * Adds a product to the repository.
     *
     * @param product the product to be added
     */
    public void add(Product product) {
        productRepository.save(product);
    }

    /**
     * Find product by id.
     *
     * @param id the id of the product
     * @return the product if present
     */
    public Optional<Product> findById(String id) {
        Long convertedId = Long.valueOf(id);
        return productRepository.findById(convertedId);
    }

    /**
     * Updates a prodic.
     *
     * @param id          the id of the product
     * @param title       the title of the product
     * @param description the description of the product
     * @return {@code true} if successful, {@code false} if not successful
     */
    @Transactional
    public boolean updateProduct(String id, String title, String description) {
        String sql = "update products set title='" + title + "',description= '" + description + "' where id=" + id;
        entityManager.joinTransaction();
        int nrOfUpdatedTables = entityManager.createNativeQuery(sql).executeUpdate();
        return nrOfUpdatedTables == 1;
    }
}

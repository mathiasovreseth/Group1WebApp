package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.service.ProductService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

/**
 * Represents the product controller of the application.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    /**
     * Instantiates a new Product controller.
     *
     * @param productService the product service
     */
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Gets all products.
     *
     * @return all products
     */
    @CrossOrigin
    @GetMapping("getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    /**
     * Gets product by id.
     *
     * @param id the id of the product
     * @return the product by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getProductByID(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    /**
     * Updates the specified product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PutMapping("update")
    public ResponseEntity<?> updateProduct(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            String title = json.getString("title");
            String description = json.getString("description");

            if (productService.updateProduct(id, title, description)) {
                return ResponseEntity.ok("product updated");
            } else {
                return new ResponseEntity("Failed to update Product", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (JSONException e) {
            return new ResponseEntity("Field(s) missing or null in request", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Removes the specified product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @DeleteMapping("remove")
    public ResponseEntity<?> removeProduct(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            Optional<Product> productOptional = productService.findById(id);
            if (productOptional.isPresent()) {
                productService.removeProduct(id);
                return ResponseEntity.ok("product removed");
            } else {
                return new ResponseEntity("Product does not exist", HttpStatus.NOT_FOUND);
            }
        } catch (JSONException e) {
            return new ResponseEntity("Field(s) missing or null in request", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Adds a product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PostMapping("add")
    public ResponseEntity<?> addProduct(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String title = json.getString("title");
            String description = json.getString("description");
            Product product = new Product(title, description);
            productService.add(product);
            return ResponseEntity.ok("product added");
        } catch (JSONException | IllegalArgumentException e) {
            return new ResponseEntity("Field(s) missing or null in request", HttpStatus.BAD_REQUEST);
        }
    }
}


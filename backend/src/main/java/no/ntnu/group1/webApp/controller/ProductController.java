package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.service.ProductService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @CrossOrigin
    @GetMapping("getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getProductByID(@PathParam("id") Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @CrossOrigin
    @PostMapping("update")
    public ResponseEntity<?> updateProduct(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            String title = json.getString("title");
            String description = json.getString("description");

            if (productService.updateProduct(id, title, description)) {
                return ResponseEntity.ok("product updated");
            } else {
                return ResponseEntity.internalServerError().build();

            }
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping("remove")
    public ResponseEntity<?> removeProduct(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            String id = json.getString("id");
            Optional<Product> productOptional = productService.findById(id);
            if (productOptional.isPresent()) {
                productService.removeProduct(id);
                return ResponseEntity.ok("product removed");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

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
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}


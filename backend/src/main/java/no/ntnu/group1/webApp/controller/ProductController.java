package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public  ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getProductByID(@PathParam("id") Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

}


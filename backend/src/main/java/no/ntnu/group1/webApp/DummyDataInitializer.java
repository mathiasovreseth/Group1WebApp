package no.ntnu.group1.webApp;

import no.ntnu.group1.webApp.models.Order;
import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.OrderRepository;
import no.ntnu.group1.webApp.repositories.ProductRepository;
import no.ntnu.group1.webApp.repositories.ReviewRepository;
import no.ntnu.group1.webApp.repositories.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.logging.Logger;

public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private OrderRepository orderRepository;

    private final Logger logger = (Logger) LoggerFactory.getLogger("DummyInit");



    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if(isDataImported()) {
            logger.info("Data already exists.");
            return;
        }

        logger.info("Importing test data...");
        User sjur = new User("Sjur","sjur@mail.com","superpass", User.Roles.ADMIN);
        User notAdmin = new User("Bob", "bob@mail.com", "passpass", User.Roles.USER);
        userRepository.save(sjur);
        userRepository.save(notAdmin);

        Product item1 = new Product("Test item number 1");
        productRepository.save(item1);

        Product itemWithReview = new Product("Test item number 2 with review");
        Review review1 = new Review("test review for testing");
        reviewRepository.save(review1); //todo burde kanskje lage i review hvilket produkt det hører til
        itemWithReview.addReview(review1);
        productRepository.save(itemWithReview);

        //todo må ha handlekurv klasse om vi skal ha list med produkter i order
        Order order1 = new Order(notAdmin, new ArrayList((Collection) sjur), new Date());
        orderRepository.save(order1);

        logger.info("Done importing data");


    }

    private boolean isDataImported() {
        return userRepository.count() > 0;
    }
}

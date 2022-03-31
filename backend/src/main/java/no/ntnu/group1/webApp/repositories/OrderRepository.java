package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.Order;
import org.springframework.data.repository.CrudRepository;


public interface OrderRepository  extends CrudRepository<Order, Long> {
}

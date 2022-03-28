package no.ntnu.group1.webApp.repositories;

import no.ntnu.group1.webApp.models.Roles;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Roles, Long> {
}

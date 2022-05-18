package ua.univ.autobase_backend.repository.modelRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ua.univ.autobase_backend.entity.modelEntities.Car;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "cars", path = "cars")
public interface CarRepository extends JpaRepository<Car, Integer> {
}

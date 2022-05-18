package ua.univ.autobase_backend.repository.modelRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ua.univ.autobase_backend.entity.modelEntities.CarDriver;
import ua.univ.autobase_backend.entity.modelEntities.Driver;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "carDrivers", path = "carDrivers")
public interface CarDriverRepository  extends JpaRepository<CarDriver, Integer> {
}

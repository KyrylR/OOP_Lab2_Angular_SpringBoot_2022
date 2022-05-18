package ua.univ.autobase_backend.repository.modelRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ua.univ.autobase_backend.entity.modelEntities.Bid;
import ua.univ.autobase_backend.entity.modelEntities.Driver;


@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "bids", path = "bids")
public interface BidRepository extends JpaRepository<Bid, Integer> {
}

package ua.univ.autobase_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.univ.autobase_backend.entity.Bid;

public interface BidRepository extends JpaRepository<Bid, Integer> {
}

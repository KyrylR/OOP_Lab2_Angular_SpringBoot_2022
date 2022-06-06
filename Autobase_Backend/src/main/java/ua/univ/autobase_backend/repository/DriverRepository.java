package ua.univ.autobase_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.univ.autobase_backend.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Integer> {
}

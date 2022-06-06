package ua.univ.autobase_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.univ.autobase_backend.entity.Car;

public interface CarRepository extends JpaRepository<Car, Integer> {
}

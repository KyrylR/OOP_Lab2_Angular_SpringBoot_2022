package ua.univ.autobase_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.univ.autobase_backend.entity.CarDriver;

public interface CarDriverRepository  extends JpaRepository<CarDriver, Integer> {
}

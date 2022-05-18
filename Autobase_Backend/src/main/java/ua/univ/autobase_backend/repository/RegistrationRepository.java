package ua.univ.autobase_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.univ.autobase_backend.entity.RegistrationEntity;

import javax.servlet.Registration;

public interface RegistrationRepository extends JpaRepository<RegistrationEntity, Long> {
}

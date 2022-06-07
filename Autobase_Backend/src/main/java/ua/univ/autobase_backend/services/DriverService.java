package ua.univ.autobase_backend.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.univ.autobase_backend.entity.Driver;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.repository.DriverRepository;
import ua.univ.autobase_backend.utils.ServerUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class DriverService {
    private static final String BAD_DRIVER_ID = "Bad driver id parameter!";

    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver save(Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver getDriver(String id) {
        int intId = ServerUtils.parseParameterId(id);
        Optional<Driver> value = driverRepository.findById(intId);
        if (value.isPresent()) {
            return value.get();
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public Driver updateDriver(String id, Driver driver) {
        int intId = ServerUtils.parseParameterId(id);
        if (driverRepository.findById(intId).isPresent()) {
            return driverRepository.findById(intId)
                    .map(driverNew -> {
                        driverNew.setName(driver.getName());
                        return driverRepository.save(driverNew);
                    })
                    .orElseGet(() -> {
                        driver.setId(intId);
                        return driverRepository.save(driver);
                    });
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public void deleteDriver(String id) {
        int intId = ServerUtils.parseParameterId(id);
        if (driverRepository.findById(intId).isPresent()) {
            driverRepository.deleteById(intId);
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }
}

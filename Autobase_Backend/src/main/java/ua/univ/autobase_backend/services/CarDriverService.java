package ua.univ.autobase_backend.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.univ.autobase_backend.entity.CarDriver;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.repository.CarDriverRepository;
import ua.univ.autobase_backend.utils.ServerUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class CarDriverService {
    private static final String BAD_DRIVER_ID = "Bad Car-Driver id parameter!";
    private CarDriverRepository carDriverRepository;

    public List<CarDriver> getAllCarDrivers() {
        return carDriverRepository.findAll();
    }

    public CarDriver save(CarDriver driver) {
        return carDriverRepository.save(driver);
    }

    public CarDriver getCarDriver(String id) {
        int intId = ServerUtils.parseParameterId(id);
        Optional<CarDriver> value = carDriverRepository.findById(intId);
        if (value.isPresent()) {
            return value.get();
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    public CarDriver updateCarDriver(String id, CarDriver carDriver) {
        int intId = ServerUtils.parseParameterId(id);
        if (carDriverRepository.findById(intId).isPresent()) {
            return carDriverRepository.findById(intId)
                    .map(carDriverNew -> {
                        carDriverNew.setDriver(carDriver.getDriver());
                        carDriverNew.setCar(carDriver.getCar());
                        return carDriverRepository.save(carDriverNew);
                    })
                    .orElseGet(() -> {
                        carDriver.setId(intId);
                        return carDriverRepository.save(carDriver);
                    });
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    public void deleteCarDriver(String id) {
        int intId = ServerUtils.parseParameterId(id);
        if (carDriverRepository.findById(intId).isPresent()) {
            carDriverRepository.deleteById(intId);
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }
}

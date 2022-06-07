package ua.univ.autobase_backend.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.univ.autobase_backend.entity.Car;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.repository.CarRepository;
import ua.univ.autobase_backend.utils.ServerUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class CarService {
    private static final String BAD_DRIVER_ID = "Bad car id parameter!";
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car save(Car driver) {
        return carRepository.save(driver);
    }

    public Car getCar(String id) {
        int intId = ServerUtils.parseParameterId(id);
        Optional<Car> value = carRepository.findById(intId);
        if (value.isPresent()) {
            return value.get();
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public Car updateCar(String id, Car car) {
        int intId = ServerUtils.parseParameterId(id);
        if (carRepository.findById(intId).isPresent()) {
            return carRepository.findById(intId)
                    .map(carNew -> {
                        carNew.setPurpose(car.getPurpose());
                        carNew.setReady(car.isReady());
                        return carRepository.save(carNew);
                    })
                    .orElseGet(() -> {
                        car.setId(intId);
                        return carRepository.save(car);
                    });
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public void deleteCar(String id) {
        int intId = ServerUtils.parseParameterId(id);
        if (carRepository.findById(intId).isPresent()) {
            carRepository.deleteById(intId);
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }
}

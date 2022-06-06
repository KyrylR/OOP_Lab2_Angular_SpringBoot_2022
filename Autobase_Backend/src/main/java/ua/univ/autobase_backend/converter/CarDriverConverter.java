package ua.univ.autobase_backend.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ua.univ.autobase_backend.dto.CarDriverDTO;
import ua.univ.autobase_backend.entity.Car;
import ua.univ.autobase_backend.entity.CarDriver;
import ua.univ.autobase_backend.entity.Driver;
import ua.univ.autobase_backend.services.CarService;
import ua.univ.autobase_backend.services.DriverService;

@AllArgsConstructor
@Component
public class CarDriverConverter {
    private CarService carService;
    private DriverService driverService;

    public CarDriver convertToEntity(CarDriverDTO carDriverDTO) {
        Car car = carService.getCar(carDriverDTO.getCarId());
        Driver driver = driverService.getDriver(carDriverDTO.getDriverId());
        return new CarDriver(-1, car, driver);
    }
}

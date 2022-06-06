package ua.univ.autobase_backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.univ.autobase_backend.entity.Car;
import ua.univ.autobase_backend.entity.Response;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.services.CarService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/cars")
public class CarController {
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Car getCar(@PathVariable String id) {
        return carService.getCar(id);
    }

    @PostMapping
    public Car addCars(@RequestBody Car car) {
        return carService.save(car);
    }

    @PutMapping("/{id}")
    public Car updateCar(@RequestBody Car car, @PathVariable String id) {
        return carService.updateCar(id, car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
    }

    @ExceptionHandler(IncorrectParameterException.class)
    public ResponseEntity<Response> handleException(IncorrectParameterException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}

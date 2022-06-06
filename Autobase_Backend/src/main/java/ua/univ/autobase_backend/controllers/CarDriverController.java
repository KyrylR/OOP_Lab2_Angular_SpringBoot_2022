package ua.univ.autobase_backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.univ.autobase_backend.converter.CarDriverConverter;
import ua.univ.autobase_backend.dto.CarDriverDTO;
import ua.univ.autobase_backend.entity.CarDriver;
import ua.univ.autobase_backend.entity.Response;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.services.CarDriverService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/carDrivers")
public class CarDriverController {
    private CarDriverService carDriverService;
    private CarDriverConverter carDriverConverter;

    @GetMapping
    public List<CarDriver> getAllCarDrivers() {
        return carDriverService.getAllCarDrivers();
    }

    @GetMapping("/{id}")
    public CarDriver getCarDriver(@PathVariable String id) {
        return carDriverService.getCarDriver(id);
    }

    @PostMapping
    public CarDriver addCarDrivers(@RequestBody CarDriverDTO carDriverDTO) {
        return carDriverService.save(carDriverConverter.convertToEntity(carDriverDTO));
    }

    @PutMapping("/{id}")
    public CarDriver updateCarDriver(@RequestBody CarDriverDTO carDriverDTO, @PathVariable String id) {
        return carDriverService.updateCarDriver(id, carDriverConverter.convertToEntity(carDriverDTO));
    }

    @DeleteMapping("/{id}")
    public void deleteCarDriver(@PathVariable String id) {
        carDriverService.deleteCarDriver(id);
    }

    @ExceptionHandler(IncorrectParameterException.class)
    public ResponseEntity<Response> handleException(IncorrectParameterException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}

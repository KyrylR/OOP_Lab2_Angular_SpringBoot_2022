package ua.univ.autobase_backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.univ.autobase_backend.entity.Driver;
import ua.univ.autobase_backend.entity.Response;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.services.DriverService;

import java.util.List;


@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/drivers")
public class DriverController {
    private DriverService driverService;

    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    public Driver getDriver(@PathVariable String id) {
        return driverService.getDriver(id);
    }

    @PostMapping
    public Driver addDrivers(@RequestBody Driver driver) {
        return driverService.save(driver);
    }

    @PutMapping("/{id}")
    public Driver updateDriver(@RequestBody Driver driver, @PathVariable String id) {
        return driverService.updateDriver(id, driver);
    }

    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);
    }

    @ExceptionHandler(IncorrectParameterException.class)
    public ResponseEntity<Response> handleException(IncorrectParameterException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}

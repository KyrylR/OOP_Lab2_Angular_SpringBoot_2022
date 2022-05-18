package ua.univ.autobase_backend.entity.modelEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "car_driver_relations")
@Entity
public class CarDriver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @OneToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @OneToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    public Integer getDriverId() {
        return driver.getId();
    }

    public Integer getCarId() {
        return car.getId();
    }
}

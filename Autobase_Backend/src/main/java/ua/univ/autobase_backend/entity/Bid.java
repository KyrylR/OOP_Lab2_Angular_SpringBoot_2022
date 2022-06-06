package ua.univ.autobase_backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bids")
@Entity
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "work_purpose", nullable = false)
    private String workPurpose;

    @Column(name = "is_finished", nullable = false)
    @JsonProperty
    private boolean isFinished;

    @Column(name = "driver_feedback", nullable = true)
    private String driverFeedback;

    @OneToOne
    @JoinColumn(name = "driver_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Driver driver;

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Integer getDriverId() {
        return driver.getId();
    }
}

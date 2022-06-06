package ua.univ.autobase_backend.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ua.univ.autobase_backend.dto.BidDTO;
import ua.univ.autobase_backend.entity.Bid;
import ua.univ.autobase_backend.entity.Driver;
import ua.univ.autobase_backend.services.DriverService;

@AllArgsConstructor
@Component
public class BidConverter {
    private DriverService driverService;

    public Bid convertToEntity(BidDTO bidDTO) {
        Driver driver = driverService.getDriver(bidDTO.getDriverId());
        return new Bid(-1, bidDTO.getWorkPurpose(), bidDTO.isFinished(), bidDTO.getDriverFeedback(), driver);
    }
}

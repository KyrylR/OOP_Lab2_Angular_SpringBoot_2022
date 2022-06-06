package ua.univ.autobase_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BidDTO {
    private String workPurpose;
    private boolean isFinished;
    private String driverFeedback;
    private String driverId;
}

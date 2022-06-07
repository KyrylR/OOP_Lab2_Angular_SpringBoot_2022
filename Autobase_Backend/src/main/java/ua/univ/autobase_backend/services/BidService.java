package ua.univ.autobase_backend.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.univ.autobase_backend.entity.Bid;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.repository.BidRepository;
import ua.univ.autobase_backend.utils.ServerUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class BidService {

    private static final String BAD_DRIVER_ID = "Bad bid id parameter!";
    private BidRepository bidRepository;

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid save(Bid driver) {
        return bidRepository.save(driver);
    }

    public Bid getBid(String id) {
        int intId = ServerUtils.parseParameterId(id);
        Optional<Bid> value = bidRepository.findById(intId);
        if (value.isPresent()) {
            return value.get();
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public Bid updateBid(String id, Bid bid) {
        int intId = ServerUtils.parseParameterId(id);
        if (bidRepository.findById(intId).isPresent()) {
            return bidRepository.findById(intId)
                    .map(bidNew -> {
                        bidNew.setDriver(bid.getDriver());
                        bidNew.setFinished(bid.isFinished());
                        bidNew.setDriverFeedback(bid.getDriverFeedback());
                        bidNew.setWorkPurpose(bid.getWorkPurpose());
                        return bidRepository.save(bidNew);
                    })
                    .orElseGet(() -> {
                        bid.setId(intId);
                        return bidRepository.save(bid);
                    });
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }

    @Transactional
    public void deleteBid(String id) {
        int intId = ServerUtils.parseParameterId(id);
        if (bidRepository.findById(intId).isPresent()) {
            bidRepository.deleteById(intId);
        } else {
            throw new IncorrectParameterException(BAD_DRIVER_ID);
        }
    }
}

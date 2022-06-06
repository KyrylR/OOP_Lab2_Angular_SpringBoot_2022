package ua.univ.autobase_backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.univ.autobase_backend.converter.BidConverter;
import ua.univ.autobase_backend.dto.BidDTO;
import ua.univ.autobase_backend.entity.Bid;
import ua.univ.autobase_backend.entity.Response;
import ua.univ.autobase_backend.exceptions.IncorrectParameterException;
import ua.univ.autobase_backend.services.BidService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidController {
    private BidService bidService;
    private BidConverter bidConverter;

    @GetMapping
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/{id}")
    public Bid getBid(@PathVariable String id) {
        return bidService.getBid(id);
    }

    @PostMapping
    public Bid addBids(@RequestBody BidDTO bidDTO) {
        return bidService.save(bidConverter.convertToEntity(bidDTO));
    }

    @PutMapping("/{id}")
    public Bid updateBid(@RequestBody BidDTO bidDTO, @PathVariable String id) {
        return bidService.updateBid(id, bidConverter.convertToEntity(bidDTO));
    }

    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable String id) {
        bidService.deleteBid(id);
    }

    @ExceptionHandler(IncorrectParameterException.class)
    public ResponseEntity<Response> handleException(IncorrectParameterException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}

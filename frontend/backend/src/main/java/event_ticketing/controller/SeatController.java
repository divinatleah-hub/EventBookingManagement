package event_ticketing.controller;

import event_ticketing.entity.Seat;
import event_ticketing.service.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/{id}")
    public Optional<Seat> getSeatById(@PathVariable("id") int id) {
        return seatService.getSeatById(id);
    }

    @GetMapping("/status/{status}")
    public List<Seat> getSeatsByStatus(@PathVariable("status") String status) {
        return seatService.getSeatsByStatus(status);
    }

    @PostMapping
    public Seat createSeat(@RequestBody Seat seat) {
        return seatService.saveSeat(seat);
    }

    @PutMapping("/{id}")
    public Seat updateSeat(@PathVariable("id") int id, @RequestBody Seat seat) {
        return seatService.updateSeat(id, seat);
    }

    @DeleteMapping("/{id}")
    public void deleteSeat(@PathVariable("id") int id) {
        seatService.deleteSeat(id);
    }
}
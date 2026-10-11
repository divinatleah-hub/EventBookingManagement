package event_ticketing.service;

import event_ticketing.entity.Seat;
import event_ticketing.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public Optional<Seat> getSeatById(int id) {
        return seatRepository.findById(id);
    }

    public Seat saveSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    public Seat updateSeat(int id, Seat seat) {
        Seat existingSeat = seatRepository.findById(id).orElseThrow();

        existingSeat.setSeatNumber(seat.getSeatNumber());
        existingSeat.setSeatStatus(seat.getSeatStatus());
        existingSeat.setVenue(seat.getVenue());

        return seatRepository.save(existingSeat);
    }

    public void deleteSeat(int id) {
        seatRepository.deleteById(id);
    }

    public List<Seat> getSeatsByStatus(String status) {
        return seatRepository.findBySeatStatus(status);
    }
}
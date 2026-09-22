package event_ticketing.repository;

import event_ticketing.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Integer> {

    List<Seat> findBySeatStatus(String seatStatus);
}
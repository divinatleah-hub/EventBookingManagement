package event_ticketing.repository;

import event_ticketing.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUser_UserId(int userId);

    List<Booking> findByEvent_EventId(int eventId);
}
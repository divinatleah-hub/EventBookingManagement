package event_ticketing.repository;

import event_ticketing.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    Optional<Ticket> findByTicketNumber(String ticketNumber);
}
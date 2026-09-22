package event_ticketing.repository;

import event_ticketing.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, Integer> {

    Optional<Venue> findByVenueName(String venueName);
}
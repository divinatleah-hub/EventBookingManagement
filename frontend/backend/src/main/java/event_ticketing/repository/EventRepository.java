package event_ticketing.repository;

import event_ticketing.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByCategory(String category);
}
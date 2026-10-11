package event_ticketing.repository;

import event_ticketing.entity.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrganizerRepository extends JpaRepository<Organizer, Integer> {

    Optional<Organizer> findByEmail(String email);
}
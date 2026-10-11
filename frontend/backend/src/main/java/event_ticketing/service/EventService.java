package event_ticketing.service;

import event_ticketing.entity.Event;
import event_ticketing.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(int id) {
        return eventRepository.findById(id);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(int id, Event event) {
        Event existingEvent = eventRepository.findById(id).orElseThrow();

        existingEvent.setEventName(event.getEventName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setCategory(event.getCategory());
        existingEvent.setEventDate(event.getEventDate());
        existingEvent.setEventTime(event.getEventTime());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setTotalSeats(event.getTotalSeats());
        existingEvent.setOrganizer(event.getOrganizer());
        existingEvent.setVenue(event.getVenue());

        return eventRepository.save(existingEvent);
    }

    public void deleteEvent(int id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category);
    }
}
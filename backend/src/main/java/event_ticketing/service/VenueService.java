package event_ticketing.service;

import event_ticketing.entity.Venue;
import event_ticketing.repository.VenueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    private final VenueRepository venueRepository;

    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Optional<Venue> getVenueById(int id) {
        return venueRepository.findById(id);
    }

    public Venue saveVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue updateVenue(int id, Venue venue) {
        Venue existingVenue = venueRepository.findById(id).orElseThrow();

        existingVenue.setVenueName(venue.getVenueName());
        existingVenue.setLocation(venue.getLocation());
        existingVenue.setCapacity(venue.getCapacity());

        return venueRepository.save(existingVenue);
    }

    public void deleteVenue(int id) {
        venueRepository.deleteById(id);
    }
}
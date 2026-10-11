package event_ticketing.controller;

import event_ticketing.entity.Venue;
import event_ticketing.service.VenueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "*")
public class VenueController {

    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public Optional<Venue> getVenueById(@PathVariable("id") int id) {
        return venueService.getVenueById(id);
    }

    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.saveVenue(venue);
    }

    @PutMapping("/{id}")
    public Venue updateVenue(@PathVariable("id") int id, @RequestBody Venue venue) {
        return venueService.updateVenue(id, venue);
    }

    @DeleteMapping("/{id}")
    public void deleteVenue(@PathVariable("id") int id) {
        venueService.deleteVenue(id);
    }
}
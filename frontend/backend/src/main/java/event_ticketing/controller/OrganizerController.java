package event_ticketing.controller;

import event_ticketing.entity.Organizer;
import event_ticketing.service.OrganizerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizers")
@CrossOrigin(origins = "*")
public class OrganizerController {

    private final OrganizerService organizerService;

    public OrganizerController(OrganizerService organizerService) {
        this.organizerService = organizerService;
    }

    @GetMapping
    public List<Organizer> getAllOrganizers() {
        return organizerService.getAllOrganizers();
    }

    @GetMapping("/{id}")
    public Optional<Organizer> getOrganizerById(@PathVariable("id") int id) {
        return organizerService.getOrganizerById(id);
    }

    @GetMapping("/email/{email}")
    public Optional<Organizer> getOrganizerByEmail(@PathVariable("email") String email) {
        return organizerService.getOrganizerByEmail(email);
    }

    @PostMapping
    public Organizer createOrganizer(@RequestBody Organizer organizer) {
        return organizerService.saveOrganizer(organizer);
    }

    @PutMapping("/{id}")
    public Organizer updateOrganizer(@PathVariable("id") int id, @RequestBody Organizer organizer) {
        return organizerService.updateOrganizer(id, organizer);
    }

    @DeleteMapping("/{id}")
    public void deleteOrganizer(@PathVariable("id") int id) {
        organizerService.deleteOrganizer(id);
    }
}
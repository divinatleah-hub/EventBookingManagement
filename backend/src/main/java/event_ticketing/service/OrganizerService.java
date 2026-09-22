package event_ticketing.service;

import event_ticketing.entity.Organizer;
import event_ticketing.repository.OrganizerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizerService {

    private final OrganizerRepository organizerRepository;

    public OrganizerService(OrganizerRepository organizerRepository) {
        this.organizerRepository = organizerRepository;
    }

    public List<Organizer> getAllOrganizers() {
        return organizerRepository.findAll();
    }

    public Optional<Organizer> getOrganizerById(int id) {
        return organizerRepository.findById(id);
    }

    public Organizer saveOrganizer(Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    public Organizer updateOrganizer(int id, Organizer organizer) {
        Organizer existingOrganizer = organizerRepository.findById(id).orElseThrow();

        existingOrganizer.setName(organizer.getName());
        existingOrganizer.setEmail(organizer.getEmail());
        existingOrganizer.setPassword(organizer.getPassword());
        existingOrganizer.setPhone(organizer.getPhone());

        return organizerRepository.save(existingOrganizer);
    }

    public void deleteOrganizer(int id) {
        organizerRepository.deleteById(id);
    }

    public Optional<Organizer> getOrganizerByEmail(String email) {
        return organizerRepository.findByEmail(email);
    }
}
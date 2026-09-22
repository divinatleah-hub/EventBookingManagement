package event_ticketing.controller;

import event_ticketing.entity.Ticket;
import event_ticketing.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable("id") int id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping("/number/{ticketNumber}")
    public Optional<Ticket> getTicketByNumber(@PathVariable("ticketNumber") String ticketNumber) {
        return ticketService.getTicketByNumber(ticketNumber);
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.saveTicket(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable("id") int id, @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable("id") int id) {
        ticketService.deleteTicket(id);
    }
}
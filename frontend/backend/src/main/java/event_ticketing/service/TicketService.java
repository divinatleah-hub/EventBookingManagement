package event_ticketing.service;

import event_ticketing.entity.Ticket;
import event_ticketing.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(int id) {
        return ticketRepository.findById(id);
    }

    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(int id, Ticket ticket) {
        Ticket existingTicket = ticketRepository.findById(id).orElseThrow();

        existingTicket.setTicketNumber(ticket.getTicketNumber());
        existingTicket.setIssuedDate(ticket.getIssuedDate());
        existingTicket.setBooking(ticket.getBooking());

        return ticketRepository.save(existingTicket);
    }

    public void deleteTicket(int id) {
        ticketRepository.deleteById(id);
    }

    public Optional<Ticket> getTicketByNumber(String ticketNumber) {
        return ticketRepository.findByTicketNumber(ticketNumber);
    }
}
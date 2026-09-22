package event_ticketing.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;

    @Column(unique = true, nullable = false)
    private String ticketNumber;

    private LocalDateTime issuedDate;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    public Ticket() {
    }

    @PrePersist
    public void beforeSave() {
        if (issuedDate == null) {
            issuedDate = LocalDateTime.now();
        }
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public LocalDateTime getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(LocalDateTime issuedDate) {
        this.issuedDate = issuedDate;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
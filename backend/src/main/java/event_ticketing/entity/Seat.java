package event_ticketing.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seatId;

    @Column(nullable = false)
    private String seatNumber;

    private String seatStatus = "AVAILABLE";

    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;

    public Seat() {
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(String seatStatus) {
        this.seatStatus = seatStatus;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }
}
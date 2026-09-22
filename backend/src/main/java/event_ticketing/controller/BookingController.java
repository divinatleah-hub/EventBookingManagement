package event_ticketing.controller;

import event_ticketing.entity.Booking;
import event_ticketing.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Optional<Booking> getBookingById(@PathVariable("id") int id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable("userId") int userId) {
        return bookingService.getBookingsByUser(userId);
    }

    @GetMapping("/event/{eventId}")
    public List<Booking> getBookingsByEvent(@PathVariable("eventId") int eventId) {
        return bookingService.getBookingsByEvent(eventId);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable("id") int id, @RequestBody Booking booking) {
        return bookingService.updateBooking(id, booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable("id") int id) {
        bookingService.deleteBooking(id);
    }
}
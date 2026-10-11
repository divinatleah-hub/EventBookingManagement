package event_ticketing.service;

import event_ticketing.entity.Booking;
import event_ticketing.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(int id, Booking booking) {
        Booking existingBooking = bookingRepository.findById(id).orElseThrow();

        existingBooking.setBookingDate(booking.getBookingDate());
        existingBooking.setAmount(booking.getAmount());
        existingBooking.setStatus(booking.getStatus());
        existingBooking.setUser(booking.getUser());
        existingBooking.setEvent(booking.getEvent());
        existingBooking.setSeat(booking.getSeat());

        return bookingRepository.save(existingBooking);
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> getBookingsByUser(int userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

    public List<Booking> getBookingsByEvent(int eventId) {
        return bookingRepository.findByEvent_EventId(eventId);
    }
}
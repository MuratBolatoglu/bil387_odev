package com.example.busticket.service;

import com.example.busticket.entity.Booking;
import com.example.busticket.entity.TripSchedule;
import com.example.busticket.entity.User;
import com.example.busticket.repository.BookingRepository;
import com.example.busticket.repository.TripScheduleRepository;
import com.example.busticket.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final TripScheduleRepository tripScheduleRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, TripScheduleRepository tripScheduleRepository,
            UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.tripScheduleRepository = tripScheduleRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking bookTicket(Long tripId, Long userId, Integer seatNumber) {
        TripSchedule trip = tripScheduleRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Simple seat availability check
        List<Booking> existingBookings = bookingRepository.findByTripScheduleId(tripId);
        boolean isTaken = existingBookings.stream()
                .anyMatch(b -> b.getSeatNumber().equals(seatNumber) && !"CANCELLED".equals(b.getStatus()));

        if (isTaken) {
            throw new RuntimeException("Seat already taken");
        }

        Booking booking = new Booking();
        booking.setTripSchedule(trip);
        booking.setUser(user);
        booking.setSeatNumber(seatNumber);
        booking.setStatus("BOOKED");
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user);
    }
}

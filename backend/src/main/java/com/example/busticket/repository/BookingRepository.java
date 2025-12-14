package com.example.busticket.repository;

import com.example.busticket.entity.Booking;
import com.example.busticket.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);

    List<Booking> findByTripScheduleId(Long tripId);
}

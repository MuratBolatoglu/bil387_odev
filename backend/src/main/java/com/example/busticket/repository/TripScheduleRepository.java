package com.example.busticket.repository;

import com.example.busticket.entity.TripSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TripScheduleRepository extends JpaRepository<TripSchedule, Long> {
    List<TripSchedule> findByDepartureTimeBetween(LocalDateTime start, LocalDateTime end);
}

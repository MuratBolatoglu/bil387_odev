package com.example.busticket.controller;

import com.example.busticket.entity.TripSchedule;
import com.example.busticket.repository.TripScheduleRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {
    private final TripScheduleRepository tripScheduleRepository;

    public TripController(TripScheduleRepository tripScheduleRepository) {
        this.tripScheduleRepository = tripScheduleRepository;
    }

    @GetMapping
    public List<TripSchedule> getAllTrips(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String date) {

        List<TripSchedule> trips = tripScheduleRepository.findAll();

        // Filter by origin (case-insensitive)
        if (origin != null && !origin.isEmpty()) {
            trips = trips.stream()
                    .filter(t -> t.getRoute().getOrigin().toLowerCase().contains(origin.toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Filter by destination (case-insensitive)
        if (destination != null && !destination.isEmpty()) {
            trips = trips.stream()
                    .filter(t -> t.getRoute().getDestination().toLowerCase().contains(destination.toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Filter by date (if provided, match the date part only)
        if (date != null && !date.isEmpty()) {
            trips = trips.stream()
                    .filter(t -> t.getDepartureTime().toLocalDate().toString().equals(date))
                    .collect(Collectors.toList());
        }

        return trips;
    }
}

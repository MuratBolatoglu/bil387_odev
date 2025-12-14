# Bus Ticket Management System

A full-stack web application for managing bus ticket bookings built with Spring Boot and React.

## Features

- 🔐 User authentication (login/register)
- 🔍 Search trips by origin, destination, and date
- 🎫 Book tickets with seat selection
- 📋 View and manage bookings
- ❌ Cancel tickets
- 👤 User profile management

## Tech Stack

### Backend
- Java 11+
- Spring Boot 2.x
- PostgreSQL
- JPA/Hibernate
- Maven

### Frontend
- React 18
- Vite
- React Router
- Lucide Icons

## Prerequisites

- JDK 11 or higher
- PostgreSQL 12+
- Node.js 16+
- npm or yarn

## Setup Instructions

### 1. Database Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE busticketdb;
\q
```

### 2. Backend Setup

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Backend runs on: http://localhost:8081

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## Default Credentials

- **Test User**: test@example.com / password
- **Admin**: admin@example.com / admin

## Project Structure

```
bus_ticket_system/
├── backend/
│   ├── src/main/java/com/example/busticket/
│   │   ├── controller/     # REST API endpoints
│   │   ├── entity/         # Database models
│   │   ├── repository/     # Data access layer
│   │   └── service/        # Business logic
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql        # Seed data
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── context/        # State management
    │   └── pages/          # Page components
    └── vite.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Trips
- `GET /api/trips` - Get all trips (supports filtering)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `DELETE /api/bookings/{bookingId}` - Cancel booking

## License

This project is for educational purposes.

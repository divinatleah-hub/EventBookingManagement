# Problem Statement

## 1. Title
Event Ticketing & Seat Booking Platform

## 2. Domain
Event Management and Online Ticket Booking

## 3. Who is the user? (2-3 user types, with roles)
1. **Admin** – Manages events, venues, seats, bookings, users, and ticket details.
2. **Customer/User** – Registers, logs in, browses available events, selects seats, and books tickets.
3. **Event Organizer** – Creates and manages event information, schedules, and ticket availability.

## 4. What problem are we solving? (3-5 sentences, real-life example)
Traditional event ticket booking can be time-consuming and may require users to visit ticket counters or depend on different booking platforms. Users may also face difficulties in checking available seats and selecting their preferred seats in real time. Event organizers need an easy way to manage events, seating arrangements, ticket availability, and bookings. For example, a customer attending a college cultural event or concert should be able to view the event, select an available seat, and book a ticket online without manual intervention.

## 5. Proposed Solution (what the application will do, feature-wise)
The Event Ticketing & Seat Booking Platform will provide an online system for managing events and booking seats.

### Main Features:
- User registration and login
- Admin login and management
- Event creation and management
- Display upcoming and available events
- Event details such as date, time, venue, and ticket price
- Display venue seating arrangement
- Real-time seat availability
- Seat selection and booking
- Booking confirmation
- Ticket generation with booking details
- View booking history
- Cancel bookings
- Admin management of users, events, seats, and bookings

## 6. Core Entities / Database Tables (list all, minimum 5)
1. **User**
2. **Admin**
3. **Event**
4. **Venue**
5. **Seat**
6. **Booking**
7. **Ticket**
8. **Payment**

## 7. User Roles & Permissions

### Admin
- Add, update, and delete events
- Manage venues and seats
- View and manage users
- View all bookings
- Manage ticket availability
- View payment and booking information

### Customer/User
- Register and login
- View available events
- View event details
- Check available seats
- Select and book seats
- Make payment
- View booking history
- Cancel bookings
- View/download ticket details

### Event Organizer
- Create and update event details
- View event bookings
- Monitor ticket availability
- Manage event schedules

## 8. Success Criteria
- A user should be able to register and log in successfully.
- A user should be able to find an event and view its details.
- A user should be able to see available and booked seats.
- A user should be able to select an available seat and complete a booking in under 1 minute.
- The system should prevent two users from booking the same seat.
- The user should receive a booking confirmation after successful booking.
- Admin should be able to manage events, seats, users, and bookings.

## 9. Out of Scope
The following features will not be included in the initial version:

- Real-world ticket delivery
- Physical ticket printing
- Advanced recommendation systems
- AI-based event recommendations
- Multiple third-party payment gateway integrations
- Live event streaming
- Facial recognition or biometric authentication
- Complex refund processing
- Mobile application development

## 10. Chosen Track
**Java – Spring Boot**
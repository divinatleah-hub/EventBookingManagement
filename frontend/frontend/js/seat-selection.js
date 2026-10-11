const API = "http://localhost:8080/api";

const seats =
    document.querySelectorAll(".seat.available");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const seatCountElement =
    document.getElementById("seatCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const ticketPriceElement =
    document.getElementById("ticketPrice");

const eventNameElement =
    document.getElementById("eventName");

const eventDateElement =
    document.getElementById("eventDate");

const eventVenueElement =
    document.getElementById("eventVenue");

const summaryEventNameElement =
    document.getElementById("summaryEventName");

const summaryEventDateElement =
    document.getElementById("summaryEventDate");

const summaryEventVenueElement =
    document.getElementById("summaryEventVenue");

const clearButton =
    document.getElementById("clearButton");

const continueButton =
    document.getElementById("continueButton");

const seatMessage =
    document.getElementById("seatMessage");

const selectedEventId =
    localStorage.getItem("selectedEventId");

let selectedSeats = [];

let ticketPrice = 500;

let eventData = null;


async function loadEvent() {

    if (!selectedEventId) {

        seatMessage.textContent =
            "Event not found.";

        return;
    }

    try {

        const response =
            await fetch(
                `${API}/events/${selectedEventId}`
            );

        if (!response.ok) {

            seatMessage.textContent =
                "Unable to load event.";

            return;
        }

        eventData =
            await response.json();

        ticketPrice =
            Number(eventData.ticketPrice) || 0;

        if (ticketPriceElement) {

            ticketPriceElement.textContent =
                "₹" + ticketPrice;
        }

        if (eventNameElement) {

            eventNameElement.textContent =
                eventData.eventName || "";
        }

        if (eventDateElement) {

            eventDateElement.textContent =
                "📅 " + (eventData.eventDate || "");
        }

        if (eventVenueElement) {

            eventVenueElement.textContent =
                "📍 " +
                (
                    eventData.venue
                    ? eventData.venue.venueName
                    : ""
                );
        }

        if (summaryEventNameElement) {

            summaryEventNameElement.textContent =
                eventData.eventName || "";
        }

        if (summaryEventDateElement) {

            summaryEventDateElement.textContent =
                eventData.eventDate || "";
        }

        if (summaryEventVenueElement) {

            summaryEventVenueElement.textContent =
                eventData.venue
                ? eventData.venue.venueName
                : "";
        }

        updateSummary();

    } catch (error) {

        seatMessage.textContent =
            "Cannot connect to server.";
    }
}


seats.forEach(function (seat) {

    seat.addEventListener(
        "click",
        function () {

            const seatNumber =
                seat.dataset.seat;

            if (
                seat.classList.contains("selected")
            ) {

                seat.classList.remove("selected");

                selectedSeats =
                    selectedSeats.filter(
                        function (item) {
                            return item !== seatNumber;
                        }
                    );

            } else {

                seat.classList.add("selected");

                selectedSeats.push(
                    seatNumber
                );
            }

            updateSummary();
        }
    );
});


function updateSummary() {

    if (selectedSeats.length === 0) {

        selectedSeatsElement.textContent =
            "None";

    } else {

        selectedSeatsElement.textContent =
            selectedSeats.join(", ");
    }

    seatCountElement.textContent =
        selectedSeats.length;

    if (ticketPriceElement) {

        ticketPriceElement.textContent =
            "₹" + ticketPrice;
    }

    const total =
        selectedSeats.length *
        ticketPrice;

    totalAmountElement.textContent =
        "₹" + total;

    seatMessage.textContent = "";
}


if (clearButton) {

    clearButton.addEventListener(
        "click",
        function () {

            selectedSeats = [];

            seats.forEach(function (seat) {

                seat.classList.remove(
                    "selected"
                );
            });

            updateSummary();
        }
    );
}


if (continueButton) {

    continueButton.addEventListener(
        "click",
        function () {

            if (selectedSeats.length === 0) {

                seatMessage.textContent =
                    "Please select at least one seat.";

                return;
            }

            const bookingData = {

                eventId:
                    selectedEventId,

                event:
                    eventData ?
                    eventData.eventName :
                    "",

                date:
                    eventData ?
                    eventData.eventDate :
                    "",

                time:
                    eventData ?
                    eventData.eventTime :
                    "",

                venue:
                    eventData &&
                    eventData.venue ?
                    eventData.venue.venueName :
                    "",

                seats:
                    selectedSeats,

                price:
                    ticketPrice,

                total:
                    selectedSeats.length *
                    ticketPrice
            };


            localStorage.setItem(
                "bookingData",
                JSON.stringify(bookingData)
            );


            localStorage.setItem(
                "selectedSeats",
                JSON.stringify(selectedSeats)
            );


            window.location.href =
                "booking.html";
        }
    );
}


loadEvent();
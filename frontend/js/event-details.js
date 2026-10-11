const API = "http://localhost:8080/api";

const bookNowButton =
    document.getElementById("bookNowButton");

const availableSeats =
    document.getElementById("availableSeats");

const bookingMessage =
    document.getElementById("bookingMessage");


const eventId =
    localStorage.getItem("selectedEventId");


async function loadEvent() {

    if (!eventId) {

        bookingMessage.textContent =
            "Event not found.";

        return;
    }


    try {

        const response =
            await fetch(`${API}/events/${eventId}`);


        if (!response.ok) {

            bookingMessage.textContent =
                "Unable to load event.";

            return;
        }


        const event =
            await response.json();


        localStorage.setItem(
            "selectedEvent",
            JSON.stringify(event)
        );


        if (availableSeats) {

            availableSeats.textContent =
                event.totalSeats || 0;

        }

    } catch (error) {

        bookingMessage.textContent =
            "Cannot connect to server.";

    }

}


if (bookNowButton) {

    bookNowButton.addEventListener(
        "click",
        function () {

            const seats =
                parseInt(
                    availableSeats.textContent
                ) || 0;


            if (seats <= 0) {

                bookingMessage.textContent =
                    "Sorry, no seats are available.";

                return;
            }


            window.location.href =
                "seat-selection.html";

        }
    );

}


loadEvent();
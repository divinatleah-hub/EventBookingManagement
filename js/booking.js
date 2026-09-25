const API = "http://localhost:8080/api";

const bookingForm =
    document.getElementById("bookingForm");

const formMessage =
    document.getElementById("formMessage");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const seatCountElement =
    document.getElementById("seatCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const ticketPriceElement =
    document.getElementById("ticketPrice");


function getSelectedSeats() {

    const data =
        localStorage.getItem("selectedSeats");

    if (!data) {
        return [];
    }

    try {

        const seats =
            JSON.parse(data);

        if (Array.isArray(seats)) {
            return seats;
        }

        return [];

    } catch (error) {

        return data
            .split(",")
            .map(function (seat) {
                return seat.trim();
            })
            .filter(Boolean);
    }
}


async function loadBookingDetails() {

    const eventId =
        localStorage.getItem("selectedEventId");

    if (!eventId) {

        showMessage(
            "Event information not found.",
            "red"
        );

        return;
    }

    try {

        const response =
            await fetch(
                `${API}/events/${eventId}`
            );

        if (!response.ok) {
            throw new Error("Event not found");
        }

        const event =
            await response.json();

        const selectedSeats =
            getSelectedSeats();

        const price =
            Number(event.ticketPrice || 0);

        const count =
            selectedSeats.length;

        const total =
            price * count;

        if (ticketPriceElement) {

            ticketPriceElement.textContent =
                "₹" + price;
        }

        if (seatCountElement) {

            seatCountElement.textContent =
                count;
        }

        if (totalAmountElement) {

            totalAmountElement.textContent =
                "₹" + total;
        }

        if (selectedSeatsElement) {

            if (count > 0) {

                selectedSeatsElement.textContent =
                    selectedSeats
                        .map(function (seat) {

                            if (
                                typeof seat === "object" &&
                                seat.seatNumber
                            ) {
                                return seat.seatNumber;
                            }

                            return seat;
                        })
                        .join(", ");

            } else {

                selectedSeatsElement.textContent =
                    "None";
            }
        }

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to load booking details.",
            "red"
        );
    }
}


function showMessage(message, color) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent =
        message;

    if (color === "green") {

        formMessage.style.color =
            "#16a34a";

    } else {

        formMessage.style.color =
            "#dc2626";
    }
}


async function getUserByEmail(email) {

    const response =
        await fetch(
            `${API}/users/email/${encodeURIComponent(email)}`
        );

    if (!response.ok) {

        throw new Error(
            "User account not found."
        );
    }

    return await response.json();
}


async function getEvent(eventId) {

    const response =
        await fetch(
            `${API}/events/${eventId}`
        );

    if (!response.ok) {

        throw new Error(
            "Event not found."
        );
    }

    return await response.json();
}


async function getSeats() {

    const response =
        await fetch(
            `${API}/seats`
        );

    if (!response.ok) {

        throw new Error(
            "Unable to load seats."
        );
    }

    return await response.json();
}


function findSeat(seats, selectedSeat) {

    if (
        selectedSeat &&
        typeof selectedSeat === "object"
    ) {

        if (selectedSeat.seatId) {

            return seats.find(
                function (seat) {

                    return Number(seat.seatId) ===
                        Number(selectedSeat.seatId);
                }
            );
        }

        if (selectedSeat.seatNumber) {

            return seats.find(
                function (seat) {

                    return String(seat.seatNumber)
                        .toLowerCase() ===
                        String(selectedSeat.seatNumber)
                            .toLowerCase();
                }
            );
        }
    }


    if (
        !isNaN(selectedSeat) &&
        String(selectedSeat).trim() !== ""
    ) {

        const seatById =
            seats.find(
                function (seat) {

                    return Number(seat.seatId) ===
                        Number(selectedSeat);
                }
            );

        if (seatById) {
            return seatById;
        }
    }


    return seats.find(
        function (seat) {

            return String(seat.seatNumber)
                .toLowerCase() ===
                String(selectedSeat)
                    .toLowerCase();
        }
    );
}


async function createBooking(
    user,
    event,
    seat
) {

    const bookingData = {

        amount:
            Number(event.ticketPrice || 0),

        status:
            "CONFIRMED",

        user: {
            userId:
                Number(user.userId)
        },

        event: {
            eventId:
                Number(event.eventId)
        },

        seat: {
            seatId:
                Number(seat.seatId)
        }
    };


    const response =
        await fetch(
            `${API}/bookings`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        bookingData
                    )
            }
        );


    if (!response.ok) {

        let errorMessage =
            "Booking request failed.";

        try {

            const errorData =
                await response.json();

            console.error(
                "Booking error:",
                errorData
            );

        } catch (error) {

            console.error(
                "Booking error status:",
                response.status
            );
        }

        throw new Error(
            errorMessage +
            " Status: " +
            response.status
        );
    }


    return await response.json();
}


async function updateSeatStatus(seat) {

    const seatData = {

        seatNumber:
            seat.seatNumber,

        seatStatus:
            "BOOKED",

        venue:
            seat.venue
    };


    const response =
        await fetch(
            `${API}/seats/${seat.seatId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        seatData
                    )
            }
        );


    if (!response.ok) {

        console.warn(
            "Seat status update failed:",
            seat.seatId
        );
    }
}


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function (formEvent) {

            formEvent.preventDefault();


            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            if (
                !fullName ||
                !email ||
                !phone
            ) {

                showMessage(
                    "Please fill all required details.",
                    "red"
                );

                return;
            }


            const selectedSeats =
                getSelectedSeats();

            const eventId =
                localStorage.getItem(
                    "selectedEventId"
                );


            if (!eventId) {

                showMessage(
                    "Event information is missing.",
                    "red"
                );

                return;
            }


            if (
                selectedSeats.length === 0
            ) {

                showMessage(
                    "Please select at least one seat.",
                    "red"
                );

                return;
            }


            const confirmButton =
                bookingForm.querySelector(
                    ".confirm-button"
                );


            if (confirmButton) {

                confirmButton.disabled =
                    true;

                confirmButton.textContent =
                    "Processing...";
            }


            try {

                const user =
                    await getUserByEmail(
                        email
                    );


                const event =
                    await getEvent(
                        eventId
                    );


                const seats =
                    await getSeats();


                const bookingIds = [];


                for (
                    const selectedSeat
                    of selectedSeats
                ) {

                    const seat =
                        findSeat(
                            seats,
                            selectedSeat
                        );


                    if (!seat) {

                        throw new Error(
                            "Seat " +
                            selectedSeat +
                            " was not found in database."
                        );
                    }


                    if (
                        seat.seatStatus ===
                        "BOOKED"
                    ) {

                        throw new Error(
                            "Seat " +
                            seat.seatNumber +
                            " is already booked."
                        );
                    }


                    const booking =
                        await createBooking(
                            user,
                            event,
                            seat
                        );


                    bookingIds.push(
                        booking.bookingId
                    );


                    await updateSeatStatus(
                        seat
                    );
                }


                const totalAmount =
                    Number(
                        event.ticketPrice
                    ) *
                    selectedSeats.length;


                const bookingData = {

                    bookingId:
                        bookingIds[0],

                    backendBookingId:
                        bookingIds[0],

                    bookingIds:
                        bookingIds,

                    userId:
                        user.userId,

                    userName:
                        fullName,

                    userEmail:
                        email,

                    phone:
                        phone,

                    eventId:
                        event.eventId,

                    event:
                        event.eventName,

                    date:
                        event.eventDate,

                    time:
                        event.eventTime,

                    venue:
                        event.venue ?
                        event.venue.venueName :
                        "",

                    seats:
                        selectedSeats,

                    price:
                        Number(
                            event.ticketPrice
                        ),

                    total:
                        totalAmount,

                    status:
                        "Pending Payment"
                };


                localStorage.setItem(
                    "bookingData",
                    JSON.stringify(
                        bookingData
                    )
                );


                localStorage.setItem(
                    "bookingId",
                    bookingIds[0]
                );


                localStorage.setItem(
                    "bookingIds",
                    JSON.stringify(
                        bookingIds
                    )
                );


                localStorage.setItem(
                    "bookingUserName",
                    fullName
                );


                localStorage.setItem(
                    "bookingUserEmail",
                    email
                );


                localStorage.setItem(
                    "bookingPhone",
                    phone
                );


                localStorage.setItem(
                    "bookingAmount",
                    totalAmount
                );


                showMessage(
                    "Booking created successfully!",
                    "green"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "payment.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Booking failed:",
                    error
                );


                showMessage(
                    error.message ||
                    "Booking failed, please try again.",
                    "red"
                );


                if (confirmButton) {

                    confirmButton.disabled =
                        false;

                    confirmButton.textContent =
                        "Confirm Booking";
                }
            }
        }
    );
}


loadBookingDetails();
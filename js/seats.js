document.addEventListener("DOMContentLoaded", function () {

    const API = "http://localhost:8080/api";

    const seats =
        document.querySelectorAll(".seat");

    const selectedSeatsInput =
        document.getElementById("selectedSeats");

    const totalAmount =
        document.getElementById("totalAmount");

    const proceedButton =
        document.getElementById("proceedButton");

    const seatMessage =
        document.getElementById("seatMessage");

    const eventId =
        localStorage.getItem("selectedEventId");

    let selectedSeats = [];

    let seatPrice = 500;


    async function loadSeats() {

        if (!eventId) {
            return;
        }

        try {

            const response =
                await fetch(
                    `${API}/seats`
                );

            if (!response.ok) {
                return;
            }

            const allSeats =
                await response.json();

            seats.forEach(function (seat) {

                const seatNumber =
                    seat.getAttribute("data-seat");

                const backendSeat =
                    allSeats.find(function (item) {
                        return item.seatNumber === seatNumber;
                    });

                if (backendSeat) {

                    seat.dataset.seatId =
                        backendSeat.seatId;

                    if (
                        backendSeat.seatStatus ===
                        "BOOKED"
                    ) {

                        seat.classList.add("booked");
                        seat.classList.remove("available");

                    }

                }

            });

        } catch (error) {

            console.log(
                "Unable to load seat data."
            );

        }

    }


    seats.forEach(function (seat) {

        seat.addEventListener(
            "click",
            function () {

                if (
                    seat.classList.contains("booked") ||
                    seat.classList.contains("unavailable")
                ) {
                    return;
                }


                const seatNumber =
                    seat.getAttribute("data-seat");


                if (
                    selectedSeats.includes(
                        seatNumber
                    )
                ) {

                    selectedSeats =
                        selectedSeats.filter(
                            function (item) {
                                return item !== seatNumber;
                            }
                        );

                    seat.classList.remove(
                        "selected"
                    );

                } else {

                    selectedSeats.push(
                        seatNumber
                    );

                    seat.classList.add(
                        "selected"
                    );

                }


                updateSeatDetails();

            }
        );

    });


    function updateSeatDetails() {

        if (selectedSeatsInput) {

            selectedSeatsInput.value =
                selectedSeats.join(", ");

        }


        const amount =
            selectedSeats.length *
            seatPrice;


        if (totalAmount) {

            totalAmount.textContent =
                "₹" + amount;

        }


        if (proceedButton) {

            proceedButton.disabled =
                selectedSeats.length === 0;

        }

    }


    if (proceedButton) {

        proceedButton.addEventListener(
            "click",
            function () {

                if (
                    selectedSeats.length === 0
                ) {

                    if (seatMessage) {

                        seatMessage.textContent =
                            "Please select at least one seat.";

                    } else {

                        alert(
                            "Please select at least one seat."
                        );

                    }

                    return;

                }


                const bookingData = {

                    eventId:
                        eventId,

                    seats:
                        selectedSeats,

                    price:
                        seatPrice,

                    total:
                        selectedSeats.length *
                        seatPrice

                };


                localStorage.setItem(
                    "bookingData",
                    JSON.stringify(
                        bookingData
                    )
                );


                localStorage.setItem(
                    "selectedSeats",
                    JSON.stringify(
                        selectedSeats
                    )
                );


                localStorage.setItem(
                    "bookingAmount",
                    selectedSeats.length *
                    seatPrice
                );


                window.location.href =
                    "payment.html";

            }
        );

    }


    loadSeats();

    updateSeatDetails();

});
document.addEventListener("DOMContentLoaded", function () {

    const seats = document.querySelectorAll(".seat");
    const selectedSeatsInput =
        document.getElementById("selectedSeats");

    const totalAmount =
        document.getElementById("totalAmount");

    const proceedButton =
        document.getElementById("proceedButton");

    let selectedSeats = [];

    const seatPrice = 500;


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
            selectedSeats.length * seatPrice;


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

                    alert(
                        "Please select at least one seat."
                    );

                    return;

                }


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


    updateSeatDetails();

});
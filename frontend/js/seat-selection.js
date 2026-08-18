const seats = document.querySelectorAll(".seat.available");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const seatCountElement =
    document.getElementById("seatCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const clearButton =
    document.getElementById("clearButton");

const continueButton =
    document.getElementById("continueButton");

const seatMessage =
    document.getElementById("seatMessage");


const ticketPrice = 500;

let selectedSeats = [];


/* =========================
   SELECT SEAT
========================= */

seats.forEach(function (seat) {

    seat.addEventListener("click", function () {

        const seatNumber =
            seat.dataset.seat;


        if (seat.classList.contains("selected")) {

            seat.classList.remove("selected");

            selectedSeats =
                selectedSeats.filter(
                    function (item) {
                        return item !== seatNumber;
                    }
                );

        } else {

            seat.classList.add("selected");

            selectedSeats.push(seatNumber);

        }


        updateSummary();

    });

});


/* =========================
   UPDATE SUMMARY
========================= */

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


    const total =
        selectedSeats.length * ticketPrice;


    totalAmountElement.textContent =
        "₹" + total;


    seatMessage.textContent = "";

}


/* =========================
   CLEAR SELECTION
========================= */

clearButton.addEventListener(
    "click",
    function () {

        selectedSeats = [];


        seats.forEach(function (seat) {

            seat.classList.remove("selected");

        });


        updateSummary();

    }
);


/* =========================
   CONTINUE BOOKING
========================= */

continueButton.addEventListener(
    "click",
    function () {

        if (selectedSeats.length === 0) {

            seatMessage.textContent =
                "Please select at least one seat.";

            return;
        }


        const bookingData = {

            event:
                "Summer Music Festival",

            date:
                "20 August 2026",

            venue:
                "Trichy Convention Hall",

            seats:
                selectedSeats,

            price:
                ticketPrice,

            total:
                selectedSeats.length * ticketPrice

        };


        localStorage.setItem(
            "bookingData",
            JSON.stringify(bookingData)
        );


        window.location.href =
            "booking.html";

    }
);
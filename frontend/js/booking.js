const bookingForm =
    document.getElementById("bookingForm");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const seatCountElement =
    document.getElementById("seatCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const formMessage =
    document.getElementById("formMessage");


const ticketPrice = 500;


/* =========================
   LOAD BOOKING DATA
========================= */

const savedBooking =
    localStorage.getItem("bookingData");


if (savedBooking) {

    const bookingData =
        JSON.parse(savedBooking);


    if (
        bookingData.seats &&
        bookingData.seats.length > 0
    ) {

        selectedSeatsElement.textContent =
            bookingData.seats.join(", ");

        seatCountElement.textContent =
            bookingData.seats.length;

        totalAmountElement.textContent =
            "₹" + bookingData.total;

    }

} else {

    selectedSeatsElement.textContent =
        "None";

    seatCountElement.textContent =
        "0";

    totalAmountElement.textContent =
        "₹0";

}


/* =========================
   PHONE VALIDATION
========================= */

const phoneInput =
    document.getElementById("phone");


phoneInput.addEventListener(
    "input",
    function () {

        phoneInput.value =
            phoneInput.value.replace(
                /[^0-9]/g,
                ""
            );

    }
);


/* =========================
   FORM SUBMIT
========================= */

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const fullName =
            document.getElementById("fullName")
                .value.trim();

        const email =
            document.getElementById("email")
                .value.trim();

        const phone =
            document.getElementById("phone")
                .value.trim();

        const city =
            document.getElementById("city")
                .value.trim();

        const notes =
            document.getElementById("notes")
                .value.trim();

        const terms =
            document.getElementById("terms")
                .checked;


        /* Check seats */

        if (!savedBooking) {

            formMessage.textContent =
                "Please select your seats first.";

            return;
        }


        const bookingData =
            JSON.parse(savedBooking);


        if (
            !bookingData.seats ||
            bookingData.seats.length === 0
        ) {

            formMessage.textContent =
                "Please select at least one seat.";

            return;
        }


        /* Check phone */

        if (phone.length !== 10) {

            formMessage.textContent =
                "Please enter a valid 10-digit phone number.";

            return;
        }


        /* Check terms */

        if (!terms) {

            formMessage.textContent =
                "Please agree to the booking terms.";

            return;
        }


        /* Update booking data */

        bookingData.customer = {

            name: fullName,

            email: email,

            phone: phone,

            city: city,

            notes: notes

        };


        bookingData.bookingId =
            "EB" +
            Date.now().toString().slice(-8);


        bookingData.bookingDate =
            new Date().toLocaleDateString(
                "en-IN"
            );


        localStorage.setItem(
            "bookingData",
            JSON.stringify(bookingData)
        );


        /* Go to payment page */

        window.location.href =
            "payment.html";

    }
);
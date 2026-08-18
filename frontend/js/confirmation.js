const bookingId =
    document.getElementById("bookingId");

const customerName =
    document.getElementById("customerName");

const customerEmail =
    document.getElementById("customerEmail");

const selectedSeats =
    document.getElementById("selectedSeats");

const seatCount =
    document.getElementById("seatCount");

const totalAmount =
    document.getElementById("totalAmount");

const ticketButton =
    document.getElementById("ticketButton");


/* GET BOOKING DATA */

const savedBooking =
    localStorage.getItem("bookingData");


if (savedBooking) {

    const bookingData =
        JSON.parse(savedBooking);


    /* BOOKING ID */

    bookingId.textContent =
        bookingData.bookingId || "EB00000000";


    /* CUSTOMER */

    if (bookingData.customer) {

        customerName.textContent =
            bookingData.customer.name || "-";

        customerEmail.textContent =
            bookingData.customer.email || "-";

    }


    /* SEATS */

    if (
        bookingData.seats &&
        bookingData.seats.length > 0
    ) {

        selectedSeats.textContent =
            bookingData.seats.join(", ");

        seatCount.textContent =
            bookingData.seats.length;

    }


    /* TOTAL */

    totalAmount.textContent =
        "₹" + (bookingData.total || 0);


} else {

    bookingId.textContent =
        "No booking found";

    customerName.textContent =
        "-";

    customerEmail.textContent =
        "-";

    selectedSeats.textContent =
        "-";

    seatCount.textContent =
        "0";

    totalAmount.textContent =
        "₹0";

}


/* VIEW TICKET */

ticketButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "ticket.html";

    }
);
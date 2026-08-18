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

const bookingId =
    document.getElementById("bookingId");

const printButton =
    document.getElementById("printButton");


/* GET BOOKING DATA */

const savedBooking =
    localStorage.getItem("bookingData");


if (savedBooking) {

    const bookingData =
        JSON.parse(savedBooking);


    /* CUSTOMER DETAILS */

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


    /* BOOKING ID */

    bookingId.textContent =
        bookingData.bookingId || "-";


} else {

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

    bookingId.textContent =
        "-";

}


/* PRINT TICKET */

printButton.addEventListener(
    "click",
    function () {

        window.print();

    }
);
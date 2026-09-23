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

const savedBooking =
    localStorage.getItem("bookingData");

function loadTicket() {

    if (!savedBooking) {
        customerName.textContent = "-";
        customerEmail.textContent = "-";
        selectedSeats.textContent = "-";
        seatCount.textContent = "0";
        totalAmount.textContent = "₹0";
        bookingId.textContent = "-";
        return;
    }

    try {
        const bookingData = JSON.parse(savedBooking);

        customerName.textContent =
            bookingData.userName || "-";

        customerEmail.textContent =
            bookingData.userEmail || "-";

        if (bookingData.seats && bookingData.seats.length > 0) {
            selectedSeats.textContent =
                bookingData.seats.join(", ");

            seatCount.textContent =
                bookingData.seats.length;
        } else {
            selectedSeats.textContent = "-";
            seatCount.textContent = "0";
        }

        totalAmount.textContent =
            "₹" + (bookingData.total || 0);

        bookingId.textContent =
            bookingData.bookingId || "-";

    } catch (error) {
        customerName.textContent = "-";
        customerEmail.textContent = "-";
        selectedSeats.textContent = "-";
        seatCount.textContent = "0";
        totalAmount.textContent = "₹0";
        bookingId.textContent = "-";
    }
}

if (printButton) {
    printButton.addEventListener("click", function () {
        window.print();
    });
}

loadTicket();
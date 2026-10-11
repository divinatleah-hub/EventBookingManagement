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

const savedBooking =
    localStorage.getItem("bookingData");

function loadBooking() {

    if (!savedBooking) {
        bookingId.textContent = "No booking found";
        customerName.textContent = "-";
        customerEmail.textContent = "-";
        selectedSeats.textContent = "-";
        seatCount.textContent = "0";
        totalAmount.textContent = "₹0";
        return;
    }

    try {
        const bookingData = JSON.parse(savedBooking);

        bookingId.textContent =
            bookingData.bookingId || "EB00000000";

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

    } catch (error) {
        bookingId.textContent = "No booking found";
        customerName.textContent = "-";
        customerEmail.textContent = "-";
        selectedSeats.textContent = "-";
        seatCount.textContent = "0";
        totalAmount.textContent = "₹0";
    }
}

if (ticketButton) {
    ticketButton.addEventListener("click", function () {
        window.location.href = "ticket.html";
    });
}

loadBooking();
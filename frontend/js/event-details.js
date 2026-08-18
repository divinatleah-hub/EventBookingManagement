const bookNowButton =
    document.getElementById("bookNowButton");

const availableSeats =
    document.getElementById("availableSeats");

const bookingMessage =
    document.getElementById("bookingMessage");


bookNowButton.addEventListener("click", function () {

    const seats =
        parseInt(availableSeats.textContent);


    if (seats <= 0) {

        bookingMessage.textContent =
            "Sorry, no seats are available.";

        return;
    }


    window.location.href = "seat-selection.html";

});
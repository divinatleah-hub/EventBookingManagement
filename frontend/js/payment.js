const paymentForm =
    document.getElementById("paymentForm");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const seatCountElement =
    document.getElementById("seatCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const paymentMessage =
    document.getElementById("paymentMessage");

const methods =
    document.querySelectorAll(".method");

const cardSection =
    document.getElementById("cardSection");

const upiSection =
    document.getElementById("upiSection");

const cardNumber =
    document.getElementById("cardNumber");

const expiry =
    document.getElementById("expiry");

const cvv =
    document.getElementById("cvv");

const upiId =
    document.getElementById("upiId");


let selectedMethod = "card";


/* =========================
   LOAD BOOKING DATA
========================= */

const savedBooking =
    localStorage.getItem("bookingData");


if (!savedBooking) {

    paymentMessage.textContent =
        "Booking information not found.";

} else {

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

}


/* =========================
   PAYMENT METHOD
========================= */

methods.forEach(function (method) {

    method.addEventListener(
        "click",
        function () {

            methods.forEach(function (item) {

                item.classList.remove("active");

            });


            method.classList.add("active");


            selectedMethod =
                method.dataset.method;


            if (selectedMethod === "card") {

                cardSection.classList.remove("hidden");

                upiSection.classList.add("hidden");

            } else {

                cardSection.classList.add("hidden");

                upiSection.classList.remove("hidden");

            }


            paymentMessage.textContent = "";

        }
    );

});


/* =========================
   CARD NUMBER FORMAT
========================= */

cardNumber.addEventListener(
    "input",
    function () {

        let value =
            cardNumber.value.replace(
                /\D/g,
                ""
            );

        value =
            value.substring(0, 16);

        value =
            value.replace(
                /(.{4})/g,
                "$1 "
            );

        cardNumber.value =
            value.trim();

    }
);


/* =========================
   EXPIRY FORMAT
========================= */

expiry.addEventListener(
    "input",
    function () {

        let value =
            expiry.value.replace(
                /\D/g,
                ""
            );

        value =
            value.substring(0, 4);


        if (value.length >= 3) {

            value =
                value.substring(0, 2)
                + "/"
                + value.substring(2);

        }


        expiry.value = value;

    }
);


/* =========================
   CVV
========================= */

cvv.addEventListener(
    "input",
    function () {

        cvv.value =
            cvv.value.replace(
                /\D/g,
                ""
            );

    }
);


/* =========================
   PAYMENT SUBMIT
========================= */

paymentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!savedBooking) {

            paymentMessage.textContent =
                "Booking information not found.";

            return;
        }


        const bookingData =
            JSON.parse(savedBooking);


        /* CARD PAYMENT */

        if (selectedMethod === "card") {

            const cardName =
                document.getElementById("cardName")
                    .value.trim();

            const cardValue =
                cardNumber.value.replace(
                    /\s/g,
                    ""
                );

            const expiryValue =
                expiry.value.trim();

            const cvvValue =
                cvv.value.trim();


            if (cardName === "") {

                paymentMessage.textContent =
                    "Please enter card holder name.";

                return;
            }


            if (cardValue.length !== 16) {

                paymentMessage.textContent =
                    "Please enter a valid 16-digit card number.";

                return;
            }


            if (expiryValue.length !== 5) {

                paymentMessage.textContent =
                    "Please enter a valid expiry date.";

                return;
            }


            if (cvvValue.length !== 3) {

                paymentMessage.textContent =
                    "Please enter a valid 3-digit CVV.";

                return;
            }

        }


        /* UPI PAYMENT */

        if (selectedMethod === "upi") {

            const upiValue =
                upiId.value.trim();


            if (upiValue === "") {

                paymentMessage.textContent =
                    "Please enter your UPI ID.";

                return;
            }


            if (!upiValue.includes("@")) {

                paymentMessage.textContent =
                    "Please enter a valid UPI ID.";

                return;
            }

        }


        /* SAVE PAYMENT */

        bookingData.payment = {

            method:
                selectedMethod,

            status:
                "Paid",

            paymentDate:
                new Date().toLocaleString("en-IN")

        };


        bookingData.status =
            "Confirmed";


        localStorage.setItem(
            "bookingData",
            JSON.stringify(bookingData)
        );


        /* GO TO CONFIRMATION */

        window.location.href =
            "confirmation.html";

    }
);
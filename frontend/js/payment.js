const API = "http://localhost:8080/api";

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

const savedBooking =
    localStorage.getItem("bookingData");

let bookingData = null;


if (!savedBooking) {

    paymentMessage.textContent =
        "Booking information not found.";

} else {

    try {

        bookingData =
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

    } catch (error) {

        paymentMessage.textContent =
            "Invalid booking information.";
    }
}


/* PAYMENT METHOD */

methods.forEach(function (method) {

    method.addEventListener(
        "click",
        function () {

            methods.forEach(function (item) {

                item.classList.remove(
                    "active"
                );

            });

            method.classList.add("active");

            selectedMethod =
                method.dataset.method;

            if (selectedMethod === "card") {

                cardSection.classList.remove(
                    "hidden"
                );

                upiSection.classList.add(
                    "hidden"
                );

            } else {

                cardSection.classList.add(
                    "hidden"
                );

                upiSection.classList.remove(
                    "hidden"
                );
            }

            paymentMessage.textContent = "";
        }
    );

});


/* CARD NUMBER */

if (cardNumber) {

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
}


/* EXPIRY */

if (expiry) {

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
                    value.substring(0, 2) +
                    "/" +
                    value.substring(2);
            }

            expiry.value = value;
        }
    );
}


/* CVV */

if (cvv) {

    cvv.addEventListener(
        "input",
        function () {

            cvv.value =
                cvv.value
                    .replace(/\D/g, "")
                    .substring(0, 3);
        }
    );
}


/* PAYMENT SUBMIT */

if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            if (!bookingData) {

                paymentMessage.textContent =
                    "Booking information not found.";

                return;
            }


            /* CARD */

            if (selectedMethod === "card") {

                const cardName =
                    document
                        .getElementById("cardName")
                        .value
                        .trim();

                const cardValue =
                    cardNumber.value
                        .replace(/\s/g, "");

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


                if (
                    expiryValue.length !== 5 ||
                    expiryValue.charAt(2) !== "/"
                ) {

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


            /* UPI */

            if (selectedMethod === "upi") {

                const upiValue =
                    upiId.value.trim();

                if (
                    upiValue === "" ||
                    !upiValue.includes("@")
                ) {

                    paymentMessage.textContent =
                        "Please enter a valid UPI ID.";

                    return;
                }
            }


            paymentMessage.textContent =
                "Processing payment...";


            try {

                let bookingId = null;


                if (
                    bookingData.bookingIds &&
                    bookingData.bookingIds.length > 0
                ) {

                    bookingId =
                        bookingData.bookingIds[0];

                } else if (
                    bookingData.backendBookingId
                ) {

                    bookingId =
                        bookingData.backendBookingId;

                } else if (
                    bookingData.bookingId
                ) {

                    bookingId =
                        bookingData.bookingId;
                }


                if (!bookingId) {

                    paymentMessage.textContent =
                        "Booking ID not found.";

                    return;
                }


                const transactionId =
                    "TXN" + Date.now();


                const paymentData = {

                    booking: {
                        bookingId:
                            Number(bookingId)
                    },

                    paymentMethod:
                        selectedMethod,

                    transactionId:
                        transactionId,

                    amount:
                        Number(bookingData.total),

                    paymentStatus:
                        "SUCCESS"
                };


                const response =
                    await fetch(
                        `${API}/payments`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    paymentData
                                )
                        }
                    );


                if (!response.ok) {

                    const errorText =
                        await response.text();

                    console.error(
                        "Payment error:",
                        errorText
                    );

                    paymentMessage.textContent =
                        "Payment could not be saved.";

                    return;
                }


                const payment =
                    await response.json();


                bookingData.payment = {

                    method:
                        selectedMethod,

                    status:
                        "Paid",

                    transactionId:
                        transactionId,

                    paymentId:
                        payment.paymentId,

                    amount:
                        Number(bookingData.total),

                    paymentDate:
                        new Date().toLocaleString(
                            "en-IN"
                        )
                };


                bookingData.status =
                    "Confirmed";


                localStorage.setItem(
                    "bookingData",
                    JSON.stringify(
                        bookingData
                    )
                );


                paymentMessage.textContent =
                    "Payment successful!";


                setTimeout(
                    function () {

                        window.location.href =
                            "confirmation.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Payment error:",
                    error
                );

                paymentMessage.textContent =
                    "Cannot connect to server.";
            }

        }
    );
}
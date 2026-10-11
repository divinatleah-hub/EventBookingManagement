/* =========================
   ADMIN LOGIN
========================= */

const adminLoginForm =
    document.getElementById("adminLoginForm");

const adminLoginMessage =
    document.getElementById("adminLoginMessage");


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById("adminEmail")
                .value
                .trim();

            const password =
                document.getElementById("adminPassword")
                .value;

            const correctEmail =
                "admin@eventbook.com";

            const correctPassword =
                "admin123";


            if (
                email === correctEmail &&
                password === correctPassword
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminEmail",
                    email
                );


                if (adminLoginMessage) {

                    adminLoginMessage.textContent =
                        "Login successful!";

                    adminLoginMessage.style.color =
                        "#16a34a";
                }


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    800
                );


            } else {

                if (adminLoginMessage) {

                    adminLoginMessage.textContent =
                        "Invalid admin email or password.";

                    adminLoginMessage.style.color =
                        "#dc2626";
                }

            }

        }
    );

}


/* =========================
   ADMIN AUTHENTICATION
========================= */

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    const adminLoggedIn =
        localStorage.getItem("adminLoggedIn");


    if (adminLoggedIn !== "true") {

        window.location.href =
            "admin-login.html";

    }


    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "adminLoggedIn"
            );

            localStorage.removeItem(
                "adminEmail"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}


/* =========================
   MANAGE EVENTS
========================= */

const addEventButton =
    document.getElementById("addEventButton");

const eventFormSection =
    document.getElementById("eventFormSection");

const cancelEventButton =
    document.getElementById("cancelEventButton");

const eventForm =
    document.getElementById("eventForm");

const eventMessage =
    document.getElementById("eventMessage");


/* Show Event Form */

if (addEventButton) {

    addEventButton.addEventListener(
        "click",
        function () {

            if (eventFormSection) {

                eventFormSection.style.display =
                    "block";

            }

            addEventButton.style.display =
                "none";

        }
    );

}


/* Cancel Event Form */

if (cancelEventButton) {

    cancelEventButton.addEventListener(
        "click",
        function () {

            if (eventForm) {

                eventForm.reset();

            }

            if (eventFormSection) {

                eventFormSection.style.display =
                    "none";

            }

            if (addEventButton) {

                addEventButton.style.display =
                    "block";

            }

            if (eventMessage) {

                eventMessage.textContent =
                    "";

            }

        }
    );

}


/* Add Event */

if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const eventNameElement =
                document.getElementById("eventName");

            const eventDateElement =
                document.getElementById("eventDate");

            const eventTimeElement =
                document.getElementById("eventTime");

            const eventVenueElement =
                document.getElementById("eventVenue");

            const eventPriceElement =
                document.getElementById("eventPrice");

            const eventCategoryElement =
                document.getElementById("eventCategory");


            if (
                !eventNameElement ||
                !eventDateElement ||
                !eventTimeElement ||
                !eventVenueElement ||
                !eventPriceElement ||
                !eventCategoryElement
            ) {

                return;

            }


            const eventName =
                eventNameElement.value.trim();

            const eventDate =
                eventDateElement.value;

            const eventTime =
                eventTimeElement.value;

            const eventVenue =
                eventVenueElement.value.trim();

            const eventPrice =
                eventPriceElement.value;

            const eventCategory =
                eventCategoryElement.value;


            if (
                !eventName ||
                !eventDate ||
                !eventTime ||
                !eventVenue ||
                !eventPrice ||
                !eventCategory
            ) {

                if (eventMessage) {

                    eventMessage.textContent =
                        "Please fill all the fields.";

                    eventMessage.style.color =
                        "#dc2626";

                }

                return;

            }


            if (eventMessage) {

                eventMessage.textContent =
                    "Event added successfully!";

                eventMessage.style.color =
                    "#16a34a";

            }


            setTimeout(
                function () {

                    eventForm.reset();

                    if (eventFormSection) {

                        eventFormSection.style.display =
                            "none";

                    }

                    if (addEventButton) {

                        addEventButton.style.display =
                            "block";

                    }

                    if (eventMessage) {

                        eventMessage.textContent =
                            "";

                    }

                },
                1000
            );

        }
    );

}


/* Event Search */

const eventSearch =
    document.getElementById("eventSearch");

const eventsTableBody =
    document.getElementById("eventsTableBody");


if (
    eventSearch &&
    eventsTableBody
) {

    eventSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                eventSearch.value
                .toLowerCase()
                .trim();

            const rows =
                eventsTableBody
                .getElementsByTagName("tr");


            for (
                let i = 0;
                i < rows.length;
                i++
            ) {

                const rowText =
                    rows[i]
                    .textContent
                    .toLowerCase();


                if (
                    rowText.includes(
                        searchValue
                    )
                ) {

                    rows[i].style.display =
                        "";

                } else {

                    rows[i].style.display =
                        "none";

                }

            }

        }
    );

}


/* =========================
   MANAGE SEATS
========================= */

const addSeatButton =
    document.getElementById("addSeatButton");

const seatFormSection =
    document.getElementById("seatFormSection");

const cancelSeatButton =
    document.getElementById("cancelSeatButton");

const seatForm =
    document.getElementById("seatForm");

const seatMessage =
    document.getElementById("seatMessage");


/* Show Seat Form */

if (addSeatButton) {

    addSeatButton.addEventListener(
        "click",
        function () {

            if (seatFormSection) {

                seatFormSection.style.display =
                    "block";

            }

            addSeatButton.style.display =
                "none";

        }
    );

}


/* Cancel Seat Form */

if (cancelSeatButton) {

    cancelSeatButton.addEventListener(
        "click",
        function () {

            if (seatForm) {

                seatForm.reset();

            }

            if (seatFormSection) {

                seatFormSection.style.display =
                    "none";

            }

            if (addSeatButton) {

                addSeatButton.style.display =
                    "block";

            }

            if (seatMessage) {

                seatMessage.textContent =
                    "";

            }

        }
    );

}


/* Add Seat */

if (seatForm) {

    seatForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const seatEvent =
                document.getElementById("seatEvent");

            const seatNumber =
                document.getElementById("seatNumber");

            const seatType =
                document.getElementById("seatType");

            const seatPrice =
                document.getElementById("seatPrice");


            if (
                !seatEvent ||
                !seatNumber ||
                !seatType ||
                !seatPrice
            ) {

                return;

            }


            if (
                !seatEvent.value ||
                !seatNumber.value.trim() ||
                !seatType.value ||
                !seatPrice.value
            ) {

                if (seatMessage) {

                    seatMessage.textContent =
                        "Please fill all the fields.";

                    seatMessage.style.color =
                        "#dc2626";

                }

                return;

            }


            if (seatMessage) {

                seatMessage.textContent =
                    "Seat added successfully!";

                seatMessage.style.color =
                    "#16a34a";

            }


            setTimeout(
                function () {

                    seatForm.reset();

                    if (seatFormSection) {

                        seatFormSection.style.display =
                            "none";

                    }

                    if (addSeatButton) {

                        addSeatButton.style.display =
                            "block";

                    }

                    if (seatMessage) {

                        seatMessage.textContent =
                            "";

                    }

                },
                1000
            );

        }
    );

}


/* Seat Search */

const seatSearch =
    document.getElementById("seatSearch");

const seatsTableBody =
    document.getElementById("seatsTableBody");


if (
    seatSearch &&
    seatsTableBody
) {

    seatSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                seatSearch.value
                .toLowerCase()
                .trim();

            const rows =
                seatsTableBody
                .getElementsByTagName("tr");


            for (
                let i = 0;
                i < rows.length;
                i++
            ) {

                const rowText =
                    rows[i]
                    .textContent
                    .toLowerCase();


                if (
                    rowText.includes(
                        searchValue
                    )
                ) {

                    rows[i].style.display =
                        "";

                } else {

                    rows[i].style.display =
                        "none";

                }

            }

        }
    );

}


/* =========================
   MANAGE USERS
========================= */

const userSearch =
    document.getElementById("userSearch");

const usersTableBody =
    document.getElementById("usersTableBody");


/* User Search */

if (
    userSearch &&
    usersTableBody
) {

    userSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                userSearch.value
                .toLowerCase()
                .trim();

            const rows =
                usersTableBody
                .getElementsByTagName("tr");


            for (
                let i = 0;
                i < rows.length;
                i++
            ) {

                const rowText =
                    rows[i]
                    .textContent
                    .toLowerCase();


                if (
                    rowText.includes(
                        searchValue
                    )
                ) {

                    rows[i].style.display =
                        "";

                } else {

                    rows[i].style.display =
                        "none";

                }

            }

        }
    );

}


/* =========================
   DELETE BUTTONS
========================= */

const deleteButtons =
    document.querySelectorAll(
        ".delete-btn"
    );


deleteButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete this item?"
                    );


                if (confirmDelete) {

                    const row =
                        button.closest("tr");


                    if (row) {

                        row.remove();

                    }

                }

            }
        );

    }
);


/* =========================
   EDIT BUTTONS
========================= */

const editButtons =
    document.querySelectorAll(
        ".edit-btn"
    );


editButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                alert(
                    "Edit functionality will be connected to the backend later."
                );

            }
        );

    }
);
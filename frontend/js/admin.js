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


/* =========================
   SHOW ADD EVENT FORM
========================= */

if (addEventButton) {

    addEventButton.addEventListener(
        "click",
        function () {

            eventFormSection.style.display =
                "block";

            addEventButton.style.display =
                "none";

            eventFormSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


/* =========================
   CANCEL EVENT FORM
========================= */

if (cancelEventButton) {

    cancelEventButton.addEventListener(
        "click",
        function () {

            eventForm.reset();

            eventFormSection.style.display =
                "none";

            addEventButton.style.display =
                "block";

            if (eventMessage) {

                eventMessage.textContent = "";

            }

        }
    );

}


/* =========================
   ADD EVENT
========================= */

if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const eventName =
                document.getElementById("eventName")
                .value
                .trim();

            const eventDate =
                document.getElementById("eventDate")
                .value;

            const eventTime =
                document.getElementById("eventTime")
                .value;

            const eventVenue =
                document.getElementById("eventVenue")
                .value
                .trim();

            const eventPrice =
                document.getElementById("eventPrice")
                .value;

            const eventCategory =
                document.getElementById("eventCategory")
                .value;


            if (
                !eventName ||
                !eventDate ||
                !eventTime ||
                !eventVenue ||
                !eventPrice ||
                !eventCategory
            ) {

                eventMessage.textContent =
                    "Please fill all the fields.";

                eventMessage.style.color =
                    "#dc2626";

                return;

            }


            eventMessage.textContent =
                "Event added successfully!";

            eventMessage.style.color =
                "#16a34a";


            setTimeout(
                function () {

                    eventForm.reset();

                    eventFormSection.style.display =
                        "none";

                    addEventButton.style.display =
                        "block";

                    eventMessage.textContent = "";

                },
                1000
            );

        }
    );

}


/* =========================
   EVENT SEARCH
========================= */

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
   DELETE EVENT
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
                        "Are you sure you want to delete this event?"
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
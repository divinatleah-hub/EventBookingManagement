const API = "http://localhost:8080/api";

const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginMessage = document.getElementById("adminLoginMessage");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("adminEmail").value.trim();

        const password =
            document.getElementById("adminPassword").value;

        if (!email || !password) {
            adminLoginMessage.textContent =
                "Please enter your email and password.";
            return;
        }

        try {

            const response = await fetch(
                `${API}/admins/email/${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                adminLoginMessage.textContent =
                    "Invalid admin email or password.";
                return;
            }

            const admin = await response.json();

            if (admin.password !== password) {
                adminLoginMessage.textContent =
                    "Invalid admin email or password.";
                return;
            }

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            localStorage.setItem(
                "adminEmail",
                admin.email
            );

            localStorage.setItem(
                "adminData",
                JSON.stringify(admin)
            );

            adminLoginMessage.textContent =
                "Login successful!";

            adminLoginMessage.style.color =
                "#16a34a";

            setTimeout(function () {
                window.location.href =
                    "dashboard.html";
            }, 800);

        } catch (error) {

            adminLoginMessage.textContent =
                "Cannot connect to server. Please start the backend.";
        }
    });
}


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

            localStorage.removeItem(
                "adminData"
            );

            window.location.href =
                "admin-login.html";
        }
    );
}


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
                eventMessage.textContent = "";
            }
        }
    );
}


if (eventForm) {

    eventForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const eventName =
                document.getElementById("eventName").value.trim();

            const eventDate =
                document.getElementById("eventDate").value;

            const eventTime =
                document.getElementById("eventTime").value;

            const eventVenue =
                document.getElementById("eventVenue").value.trim();

            const eventPrice =
                document.getElementById("eventPrice").value;

            const eventCategory =
                document.getElementById("eventCategory").value;

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
                "Event form validated.";

            eventMessage.style.color =
                "#16a34a";

            alert(
                "Event creation needs a venue ID and organizer ID from the backend."
            );
        }
    );
}


const eventSearch =
    document.getElementById("eventSearch");

const eventsTableBody =
    document.getElementById("eventsTableBody");


async function loadEvents() {

    if (!eventsTableBody) {
        return;
    }

    try {

        const response =
            await fetch(`${API}/events`);

        if (!response.ok) {
            return;
        }

        const events =
            await response.json();

        eventsTableBody.innerHTML = "";

        events.forEach(function (event) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${event.eventId}</td>
                <td>${event.eventName}</td>
                <td>${event.category || ""}</td>
                <td>${event.eventDate || ""}</td>
                <td>₹${event.ticketPrice || 0}</td>
                <td>
                    <button class="delete-btn"
                        data-id="${event.eventId}">
                        Delete
                    </button>
                </td>
            `;

            eventsTableBody.appendChild(row);
        });

        addDeleteEvents();

    } catch (error) {

        console.log("Unable to load events.");
    }
}


if (eventSearch && eventsTableBody) {

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

            for (let i = 0; i < rows.length; i++) {

                const rowText =
                    rows[i]
                        .textContent
                        .toLowerCase();

                rows[i].style.display =
                    rowText.includes(searchValue)
                        ? ""
                        : "none";
            }
        }
    );
}


function addDeleteEvents() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-btn"
        );

    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this event?"
                        );

                    if (!confirmDelete) {
                        return;
                    }

                    const id =
                        button.getAttribute("data-id");

                    try {

                        const response =
                            await fetch(
                                `${API}/events/${id}`,
                                {
                                    method: "DELETE"
                                }
                            );

                        if (response.ok) {
                            button.closest("tr").remove();
                        } else {
                            alert(
                                "Event could not be deleted."
                            );
                        }

                    } catch (error) {

                        alert(
                            "Cannot connect to server."
                        );
                    }
                }
            );
        }
    );
}


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
                seatMessage.textContent = "";
            }
        }
    );
}


if (seatForm) {

    seatForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const seatNumber =
                document.getElementById("seatNumber").value.trim();

            const seatType =
                document.getElementById("seatType").value;

            const seatPrice =
                document.getElementById("seatPrice").value;

            if (
                !seatNumber ||
                !seatType ||
                !seatPrice
            ) {

                seatMessage.textContent =
                    "Please fill all the fields.";

                seatMessage.style.color =
                    "#dc2626";

                return;
            }

            seatMessage.textContent =
                "Seat form validated.";

            seatMessage.style.color =
                "#16a34a";

            alert(
                "Seat creation needs a venue ID from the backend."
            );
        }
    );
}


const seatSearch =
    document.getElementById("seatSearch");

const seatsTableBody =
    document.getElementById("seatsTableBody");


async function loadSeats() {

    if (!seatsTableBody) {
        return;
    }

    try {

        const response =
            await fetch(`${API}/seats`);

        if (!response.ok) {
            return;
        }

        const seats =
            await response.json();

        seatsTableBody.innerHTML = "";

        seats.forEach(function (seat) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${seat.seatId}</td>
                <td>${seat.seatNumber}</td>
                <td>${seat.seatStatus}</td>
                <td>
                    <button class="delete-seat-btn"
                        data-id="${seat.seatId}">
                        Delete
                    </button>
                </td>
            `;

            seatsTableBody.appendChild(row);
        });

        addDeleteSeats();

    } catch (error) {

        console.log("Unable to load seats.");
    }
}


if (seatSearch && seatsTableBody) {

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

            for (let i = 0; i < rows.length; i++) {

                const rowText =
                    rows[i]
                        .textContent
                        .toLowerCase();

                rows[i].style.display =
                    rowText.includes(searchValue)
                        ? ""
                        : "none";
            }
        }
    );
}


function addDeleteSeats() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-seat-btn"
        );

    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this seat?"
                        );

                    if (!confirmDelete) {
                        return;
                    }

                    const id =
                        button.getAttribute("data-id");

                    try {

                        const response =
                            await fetch(
                                `${API}/seats/${id}`,
                                {
                                    method: "DELETE"
                                }
                            );

                        if (response.ok) {
                            button.closest("tr").remove();
                        } else {
                            alert(
                                "Seat could not be deleted."
                            );
                        }

                    } catch (error) {

                        alert(
                            "Cannot connect to server."
                        );
                    }
                }
            );
        }
    );
}


const userSearch =
    document.getElementById("userSearch");

const usersTableBody =
    document.getElementById("usersTableBody");


async function loadUsers() {

    if (!usersTableBody) {
        return;
    }

    try {

        const response =
            await fetch(`${API}/users`);

        if (!response.ok) {
            return;
        }

        const users =
            await response.json();

        usersTableBody.innerHTML = "";

        users.forEach(function (user) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || ""}</td>
                <td>${user.role || ""}</td>
                <td>
                    <button class="delete-user-btn"
                        data-id="${user.userId}">
                        Delete
                    </button>
                </td>
            `;

            usersTableBody.appendChild(row);
        });

        addDeleteUsers();

    } catch (error) {

        console.log("Unable to load users.");
    }
}


if (userSearch && usersTableBody) {

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

            for (let i = 0; i < rows.length; i++) {

                const rowText =
                    rows[i]
                        .textContent
                        .toLowerCase();

                rows[i].style.display =
                    rowText.includes(searchValue)
                        ? ""
                        : "none";
            }
        }
    );
}


function addDeleteUsers() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-user-btn"
        );

    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this user?"
                        );

                    if (!confirmDelete) {
                        return;
                    }

                    const id =
                        button.getAttribute("data-id");

                    try {

                        const response =
                            await fetch(
                                `${API}/users/${id}`,
                                {
                                    method: "DELETE"
                                }
                            );

                        if (response.ok) {
                            button.closest("tr").remove();
                        } else {
                            alert(
                                "User could not be deleted."
                            );
                        }

                    } catch (error) {

                        alert(
                            "Cannot connect to server."
                        );
                    }
                }
            );
        }
    );
}


loadEvents();
loadSeats();
loadUsers();
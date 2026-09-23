const API = "http://localhost:8080/api";

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const categoryFilter =
    document.getElementById("categoryFilter");

const eventContainer =
    document.querySelector(".events-container") ||
    document.querySelector(".event-container") ||
    document.querySelector(".events-grid");

const eventCount =
    document.getElementById("eventCount");

const noResults =
    document.getElementById("noResults");

let allEvents = [];


async function loadEvents() {

    try {

        const response =
            await fetch(`${API}/events`);

        if (!response.ok) {
            throw new Error("Failed to load events");
        }

        allEvents =
            await response.json();

        displayEvents(allEvents);

    } catch (error) {

        console.error(error);

        if (eventCount) {
            eventCount.textContent =
                "0 Events";
        }

        if (noResults) {
            noResults.textContent =
                "Cannot connect to server.";

            noResults.style.display =
                "block";
        }
    }
}


function displayEvents(events) {

    if (!eventContainer) {
        return;
    }

    eventContainer.innerHTML = "";

    if (events.length === 0) {

        if (eventCount) {
            eventCount.textContent =
                "0 Events";
        }

        if (noResults) {
            noResults.textContent =
                "No events found.";

            noResults.style.display =
                "block";
        }

        return;
    }


    events.forEach(function (event) {

        const card =
            document.createElement("div");

        card.className =
            "event-card";

        card.dataset.name =
            (event.eventName || "")
            .toLowerCase();

        card.dataset.category =
            event.category || "all";


        card.innerHTML = `
            <h3>${event.eventName || ""}</h3>

            <p>${event.category || ""}</p>

            <p>${event.eventDate || ""}</p>

            <p>${event.eventTime || ""}</p>

            <p>₹${event.ticketPrice || 0}</p>

            <button
                type="button"
                class="view-details-btn"
                data-event-id="${event.eventId}">
                View Details
            </button>
        `;


        eventContainer.appendChild(card);

    });


    if (eventCount) {

        eventCount.textContent =
            events.length +
            (events.length === 1
                ? " Event"
                : " Events");
    }


    if (noResults) {

        noResults.style.display =
            "none";
    }


    const buttons =
        eventContainer.querySelectorAll(
            ".view-details-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const eventId =
                    button.getAttribute(
                        "data-event-id"
                    );


                if (!eventId) {

                    console.error(
                        "Event ID not found."
                    );

                    return;
                }


                localStorage.setItem(
                    "selectedEventId",
                    String(eventId)
                );


                window.location.href =
                    "event-details.html";
            }
        );

    });

}


function filterEvents() {

    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredEvents =
        allEvents.filter(
            function (event) {

                const eventName =
                    (event.eventName || "")
                    .toLowerCase();

                const eventCategory =
                    event.category || "";


                const matchesSearch =
                    eventName.includes(
                        searchText
                    );


                const matchesCategory =
                    selectedCategory === "all" ||
                    eventCategory ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        );


    displayEvents(
        filteredEvents
    );
}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterEvents
    );
}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterEvents
    );
}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterEvents
    );
}


loadEvents();
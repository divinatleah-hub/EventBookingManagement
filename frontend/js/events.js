const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");

const eventCards = document.querySelectorAll(".event-card");
const eventCount = document.getElementById("eventCount");
const noResults = document.getElementById("noResults");


function filterEvents() {

    const searchText =
        searchInput.value.trim().toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    let visibleCount = 0;


    eventCards.forEach(function (card) {

        const eventName =
            card.dataset.name.toLowerCase();

        const eventCategory =
            card.dataset.category;


        const matchesSearch =
            eventName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            eventCategory === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    eventCount.textContent =
        visibleCount + (visibleCount === 1 ? " Event" : " Events");


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchInput.addEventListener(
    "input",
    filterEvents
);

searchButton.addEventListener(
    "click",
    filterEvents
);

categoryFilter.addEventListener(
    "change",
    filterEvents
);
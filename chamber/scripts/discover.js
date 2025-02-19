document.addEventListener("DOMContentLoaded", function () {
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => {
            // Get the container where cards will be inserted
            const container = document.getElementById("cardsContainer");

            // Loop through each item in the JSON array
            data.forEach(item => {
                // Create the card article element
                const card = document.createElement("article");
                card.className = "card";

                // Create and append the title (h2)
                const title = document.createElement("h2");
                title.textContent = item.title;
                card.appendChild(title);

                // Create and append the image within a figure
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.title;
                figure.appendChild(img);
                card.appendChild(figure);

                // Create and append the address element
                const address = document.createElement("address");
                address.textContent = item.address;
                card.appendChild(address);

                // Create and append the description paragraph
                const para = document.createElement("p");
                para.textContent = item.description;
                card.appendChild(para);

                // Create and append the "Learn More" button
                const button = document.createElement("button");
                button.textContent = "Learn More";
                button.className = "learn-more";
                card.appendChild(button);

                // Append the complete card to the container
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON data: ", error));

    // ----- LocalStorage Visit Message -----
    const visitMessageEl = document.getElementById("visitMessage");
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        // First visit
        visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diffMillis = now - parseInt(lastVisit);
        const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
        if (diffDays < 1) {
            visitMessageEl.textContent = "Back so soon! Awesome!";
        } else {
            visitMessageEl.textContent = `You last visited ${diffDays} day${diffDays === 1 ? "" : "s"} ago.`;
        }
    }
    // Update localStorage with the current visit timestamp
    localStorage.setItem("lastVisit", now);
});

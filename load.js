"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Reusable function to load parts in TypeScript
function loadHTML(id, file) {
    fetch(file)
        .then((response) => response.text())
        .then((data) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = data;
        }
        else {
            console.error(`Element with id "${id}" not found.`);
        }
    })
        .catch((err) => console.error("Error loading", file, err));
}
// Load each section
loadHTML("header", "header.html");
loadHTML("about", "current.html");
loadHTML("forecast", "forcast.html"); // <-- needs forecast container in HTML
loadHTML("footer", "footer.html");
//# sourceMappingURL=load.js.map
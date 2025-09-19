// Reusable function to load parts
function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error("Error loading", file, err));
}

// Load each section
loadHTML("header", "header.html");
loadHTML("about", "current.html");
loadHTML("forecast", "forcast.html"); // <-- needs forecast container in HTML
loadHTML("footer", "footer.html");



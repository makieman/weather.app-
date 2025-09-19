// Reusable function to load parts in TypeScript
function loadHTML(id: string, file: string): void {
  fetch(file)
    .then((response: Response) => response.text())
    .then((data: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = data;
      } else {
        console.error(`Element with id "${id}" not found.`);
      }
    })
    .catch((err: unknown) => console.error("Error loading", file, err));
}

// Load each section
loadHTML("header", "header.html");
loadHTML("about", "current.html");
loadHTML("forecast", "forcast.html"); // <-- needs forecast container in HTML
loadHTML("footer", "footer.html");

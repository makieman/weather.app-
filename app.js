
    // Reusable function to load parts
    function loadHTML(id, file ) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          document.getElementById(id).innerHTML = data;
        });
    }

    // Load each section
    loadHTML("header", "header.html");
    loadHTML("about", "current.html");
    loadHTML("footer", "footer.html");
    loadHTML("footer", "forcast.html");

  
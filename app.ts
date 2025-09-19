// src/loadHelpers.ts
export async function loadHTML(id: string, file: string): Promise<void> {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.status}`);
    const html = await res.text();

    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element with id="${id}" not found.`);
      return;
    }
    element.innerHTML = html;
  } catch (err) {
    console.error("Error loading", file, err);
    // Optional: show user-visible message:
    const element = document.getElementById(id);
    if (element) element.innerHTML = `<div class="error">Failed to load ${file}</div>`;
  }
}
// contains weather-fetch logic a fetch function like this 
// src/weather.ts
type WeatherResponse = {
  // add the fields you need from API
  name: string;
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
};

export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  const key = "YOUR_API_KEY"; // don't commit secrets; use env for production
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = (await res.json()) as WeatherResponse;
  return data;
}

export function renderCurrentWeather(data: WeatherResponse, targetId: string): void {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.main.temp} °C</p>
    <p>${data.weather[0]?.description ?? ""}</p>
  `;
}

import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { finalize } from 'rxjs/operators';
import { WeatherData } from './weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cityName: string = '';
  weatherData: WeatherData | null = null;
  error: string | null = null;
  themeClass: string = '';
  isLoading: boolean = false;
  animateTemp: boolean = false;
  backgroundUrl: string = 'https://res.cloudinary.com/dh5hssddg/image/upload/v1758880942/rainy_padx6c.jpg'; // Default to rainy background

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.cityName) {
      this.error = 'Please enter a city name.';
      this.weatherData = null;
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.weatherData = null;

    this.weatherService.getWeather(this.cityName)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: WeatherData) => {
          this.weatherData = data;
          this.triggerTempAnimation();
          this.updateThemeAndBackground();
        },
        error: () => {
          this.error = 'City not found. Please try again.';
          this.themeClass = '';
          this.backgroundUrl = 'https://res.cloudinary.com/dh5hssddg/image/upload/v1759237380/-unsplash_mdokff.jpg'; // Fallback to rainy
        }
      });
  }

  toggleTheme() {
    // A simple theme toggle implementation can be added here later.
    console.log("Theme toggle clicked!");
  }

  private triggerTempAnimation() {
    this.animateTemp = true;
    setTimeout(() => this.animateTemp = false, 500);
  }

  private updateThemeAndBackground() {
    if (!this.weatherData || !this.weatherData.weather[0]) return;

    const description = this.weatherData.weather[0].description.toLowerCase();

    // Set theme for rain for the raindrop effect
    if (description.includes('rain')) {
      this.themeClass = 'theme-rainy';
      this.generateRaindrops();
    } else {
      this.themeClass = '';
    }

    // Fetch city image, if it fails, fallback to rain background
    this.weatherService.getCityImage(this.cityName).subscribe({
      next: (imageData: any) => {
        if (imageData && imageData.hits && imageData.hits.length > 0) {
          this.backgroundUrl = imageData.hits[0].largeImageURL;
        } else {
          this.backgroundUrl = 'https://res.cloudinary.com/dh5hssddg/image/upload/v1758872166/wallpaperflare.com_wallpaper_7_onhngf.jpg';
        }
      },
      error: (err) => {
        console.error('Error fetching city image', err);
        this.backgroundUrl = 'https://res.cloudinary.com/dh5hssddg/image/upload/v1758880942/rainy_padx6c.jpg';
      }
    });
  }

  private generateRaindrops() {
    const container = document.querySelector('.raindrops');
    if (!container) return;

    // Clear existing raindrops
    container.innerHTML = '';

    for (let i = 0; i < 50; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(drop);
    }
  }
}

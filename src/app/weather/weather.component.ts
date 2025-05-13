import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = 'Dhule';
  units: string = 'imperial';  // Default to Fahrenheit

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeatherData(this.city, this.units).subscribe({
      next: (res: any) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main?.temp || 0;
        this.feelsLikeTemp = this.myWeather.main?.feels_like || 0;
        this.humidity = this.myWeather.main?.humidity || 0;
        this.pressure = this.myWeather.main?.pressure || 0;
        this.summary = this.myWeather.weather[0]?.main || 'No data';
        this.iconURL = `https://openweathermap.org/img/wn/${this.myWeather.weather[0]?.icon || '01d'}@2x.png`;
      },
      error: (error: any) => console.error('Error fetching weather data:', error),
      complete: () => console.info('API call completed')
    });
  }

  onRadioButtonChange(units: string) {
    this.units = units;
    this.getWeather();
  }

}

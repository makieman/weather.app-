import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private pixabayApiUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) { }

  getImage(city: string): Observable<any> {
    const params = {
      key: environment.pixabayApiKey,
      q: city,
      image_type: 'photo',
      category: 'places',
      per_page: '3'
    };
    return this.http.get(this.pixabayApiUrl, { params });
  }
}
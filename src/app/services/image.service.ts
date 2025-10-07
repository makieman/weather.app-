import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { PixabayResponse } from './pixabay.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private pixabayApiUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) { }

  getImage(city: string): Observable<PixabayResponse> {
    const params = new HttpParams()
      .set('key', environment.pixabayApiKey)
      .set('q', city)
      .set('image_type', 'photo')
      .set('category', 'places')
      .set('per_page', '3');

    return this.http.get<PixabayResponse>(this.pixabayApiUrl, { params });
  }
}
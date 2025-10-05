import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocationData } from '../interfaces/location.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailSent = false;

  constructor(private http: HttpClient) {}

  sendLocationToBackend(location: LocationData): Observable<any> {
    if (this.emailSent) {
      return of({ success: true, message: 'Location already sent' });
    }

    const locationData = {
      ip: location.ip,
      city: location.city,
      country: location.country,
      lat: location.lat,
      lng: location.lng,
      hostname: location.hostname,
      org: location.org,
      region: location.region,
      timezone: location.timezone
    };

    this.emailSent = true;
    return this.http.post(`${environment.apiUrl}/api/track-location`, locationData);
  }
}
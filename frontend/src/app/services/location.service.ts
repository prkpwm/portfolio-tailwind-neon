import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationData } from '../interfaces/location.interface';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly API_TOKEN = API_CONFIG.IPINFO.TOKEN;
  private locationRequest: Observable<LocationData> | null = null;

  constructor(private http: HttpClient) {}

  getUserLocation(): Observable<LocationData> {
    if (this.locationRequest) {
      return this.locationRequest;
    }

    this.locationRequest = new Observable(observer => {
      this.http.get(`${API_CONFIG.IPINFO.API_URL}?token=${this.API_TOKEN}`).subscribe({
        next: (data: any) => {
          if (data.loc) {
            const [lat, lng] = data.loc.split(',');
            observer.next({
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              city: data.city,
              country: data.country,
              hostname: data.hostname,
              ip: data.ip,
              org: data.org,
              postal: data.postal,
              region: data.region,
              timezone: data.timezone
            });
            observer.complete();
          } else {
            observer.error('No location data available');
          }
        },
        error: (error) => {
          this.locationRequest = null;
          observer.error(error);
        }
      });
    });

    return this.locationRequest;
  }
}
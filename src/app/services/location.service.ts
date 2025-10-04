import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationData {
  lat: number;
  lng: number;
  city: string;
  country: string;
  hostname: string;
  ip: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly API_TOKEN = '6e2a87a9ba4e14';

  constructor(private http: HttpClient) {}

  getUserLocation(): Observable<LocationData> {
    return new Observable(observer => {
      this.http.get(`https://ipinfo.io/json?token=${this.API_TOKEN}`).subscribe({
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
          observer.error(error);
        }
      });
    });
  }
}
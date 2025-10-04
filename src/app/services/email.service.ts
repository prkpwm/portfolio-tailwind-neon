import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocationData } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendLocationEmail(location: LocationData): Observable<any> {
    const emailData = {
      service_id: 'prkpwm',
      template_id: 'template_3ghj7y1',
      user_id: 't1lVSG3czwTrqDDKS',
      template_params: {
        to_email: 'prkpwm.dev@gmail.com',
        from_name: 'Portfolio Visitor',
        city: location.city,
        country: location.country,
        latitude: location.lat,
        longitude: location.lng,
        hostname: location.hostname,
        ip: location.ip,
        org: location.org,
        postal: location.postal,
        region: location.region,
        timezone: location.timezone,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
    // return of(null)
  }
}
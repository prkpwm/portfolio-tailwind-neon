import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocationData } from '../interfaces/location.interface';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendLocationEmail(location: LocationData): Observable<any> {
    const emailData = {
      service_id: API_CONFIG.EMAIL.SERVICE_ID,
      template_id: API_CONFIG.EMAIL.TEMPLATE_ID,
      user_id: API_CONFIG.EMAIL.USER_ID,
      template_params: {
        to_email: API_CONFIG.EMAIL.TO_EMAIL,
        from_name: API_CONFIG.EMAIL.FROM_NAME,
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

    return this.http.post(API_CONFIG.EMAIL.API_URL, emailData);
  }
}
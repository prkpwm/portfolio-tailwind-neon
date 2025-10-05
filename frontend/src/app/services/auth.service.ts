import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  verifySuperToken(token: string): Observable<{valid: boolean}> {
    return this.http.post<{valid: boolean}>(`${this.API_URL}/verify-super-token`, { token });
  }
}

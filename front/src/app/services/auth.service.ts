import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   login(pseudo: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      pseudo,
      pass
    }, httpOptions);
  }

  register(pseudo: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      pseudo,
      pass
    }, httpOptions);
  }
}
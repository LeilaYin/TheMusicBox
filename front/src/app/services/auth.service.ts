import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.post(environment.api + '/auth/login', {
      pseudo,
      pass
    }, httpOptions);
  }

  register(pseudo: string, pass: string): Observable<any> {
    return this.http.post(environment.api + '/auth/register', {
      pseudo,
      pass
    }, httpOptions);
  }
}

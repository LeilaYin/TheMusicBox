import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/songs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Array<Song>> {
    return this.http.get<Array<Song>>(environment.api + '/song');
  }
}
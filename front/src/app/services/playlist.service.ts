import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http: HttpClient) { }

  /* here you need to put the logic to call the back */
  getPlaylists(): Observable<Array<Playlist>> {
    return this.http.get<Array<Playlist>>(environment.api + '/playlist');
  }
  getPlaylist(id: number | string): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.api}/playlist/${id}/songs`);
  }
}

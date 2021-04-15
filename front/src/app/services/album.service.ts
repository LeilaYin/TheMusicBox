import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/albums';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  /* here you need to put the logic to call the back */
  getAlbums(): Observable<Array<Album>> {
    return this.http.get<Array<Album>>(environment.api + '/album');
  }
  getAlbum(id: number | string): Observable<Album> {
    return this.http.get<Album>(`${environment.api}/album/${id}`);
  }
}

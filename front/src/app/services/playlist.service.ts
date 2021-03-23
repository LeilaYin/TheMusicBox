import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/albums';
import { Playlist } from '../models/playlist'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http: HttpClient) { }

  /* here you need to put the logic to call the back */
  getPlaylists() : Observable<Array<Playlist>> {
    return this.http.get<Array<Playlist>>(environment.api + '/playlist');
  }
  
  getPlaylist(id: number | string) : Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.api}/playlist/${id}/songs`);
  }
  /*
  deleteBook(id: number | string) : Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/book/${id}`);
  }
  */
  /* pour bien faire il faudrait récupérer les codes http */
  /*createBook(book: Book) : void {
    this.http.post(environment.api + '/book', book).subscribe();
  }

  updateBook(book: Book) : void {
    this.http.put(`${environment.api}/book/${book.id}`, book).subscribe();
  }*/

}
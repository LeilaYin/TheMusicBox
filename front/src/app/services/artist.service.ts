import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/albums';
import { Artist } from '../models/artist'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }
  getArtists() : Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(environment.api + '/artist');
  }
  
  getArtist(id: number | string) : Observable<Artist> {
    return this.http.get<Artist>(`${environment.api}/artist/${id}`);
  }

  getAlbumArtist(id: number | string) : Observable<Array<Album>>{
    return this.http.get<Array<Album>>(`${environment.api}/artist/${id}/albums`).pipe(map(d => this.modify(d)));
  }

  modify(data){
    //console.log(data[0]['Albums'])
    return data[0]['Albums'] ;
    
  }

}
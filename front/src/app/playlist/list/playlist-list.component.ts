import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

  playlists$: Observable<Array<Playlist>>;

  constructor(private playlistService: PlaylistService) {

  }

  ngOnInit(): void {
    this.playlists$ = this.playlistService.getPlaylists();
  }
  /*
  deleteBook(id : number) : void {
    this.bookService.deleteBook(id).subscribe((success : boolean) => {
        //if false popup error ?
        //reload list of books
        this.books$ = this.books$.pipe(
          map(books => {
            return books.filter((book) => book.id != id);
          })
        );
    })
  }*/
}
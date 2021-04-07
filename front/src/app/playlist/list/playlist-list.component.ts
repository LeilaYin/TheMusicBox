import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './playlist-list.component.html'
})
export class PlaylistListComponent implements OnInit {
  isLoggedIn = false;
  playlists$: Observable<Array<Playlist>>;

  constructor(private playlistService: PlaylistService, private token: TokenStorageService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
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
import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/albums';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent implements OnInit {
  isLoggedIn = false;
  albums$: Observable<Array<Album>>
  constructor(private albumService: AlbumService, private token: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.albums$ = this.albumService.getAlbums();
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

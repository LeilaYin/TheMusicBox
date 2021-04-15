import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/albums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-album',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums$: Observable<Array<Album>>
  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albums$ = this.albumService.getAlbums();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  isLoggedIn = false;
  artists$: Observable<Array<Artist>>

  constructor(private artistService: ArtistService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.artists$ = this.artistService.getArtists();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists$: Observable<Array<Artist>>

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artists$ = this.artistService.getArtists();
  }
}

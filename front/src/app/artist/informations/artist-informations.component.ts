import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/albums';
import { Song } from 'src/app/models/songs';
import { ArtistService } from 'src/app/services/artist.service';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist-informations.component.html',
})
export class ArtistInformationsComponent implements OnInit {
  artist$: Observable<Artist>;
  albums$: Observable<Array<Album>>;
  songs$: Observable<Array<Song>>

  constructor(private route: ActivatedRoute, private artistService: ArtistService) { }

  ngOnInit(): void {
    // this.artist$ = this.artistService.getArtist();
    this.artist$ = this.route.paramMap.pipe(
      flatMap((params: ParamMap) => {
        const artistId = params.get('id');
        // this.albums$ =
        this.albums$ = this.artistService.getAlbumArtist(artistId);
        this.songs$ = this.artistService.getSongsArtist(artistId);
        //console.log('ALBUM');
        /*this.albums$.subscribe(opportunities => {
          console.log(opportunities);
        });*/
        return this.artistService.getArtist(artistId);
      }));
  }
}
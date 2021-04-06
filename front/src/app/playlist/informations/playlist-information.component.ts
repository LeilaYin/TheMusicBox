import { Component, OnInit } from '@angular/core';
// import { AlbumService } from 'src/app/services/album.service';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service'
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './playlist-information.component.html'
})
export class PlaylistInformationComponent implements OnInit {

    playlist$: Observable<Playlist>;
    edit: boolean;
    constructor(private route: ActivatedRoute, private router: Router,
                private playlistService: PlaylistService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.edit = false;
        this.playlist$ = this.route.paramMap.pipe(
            flatMap((params: ParamMap) => {
            const playlistId = params.get('id');
            return this.playlistService.getPlaylist(playlistId);
        }));
    }

    transform(u : string): SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl(`${environment.media}${u}`);
    }
    /*
    deleteBook(id : number) : void {
        this.bookService.deleteBook(id).subscribe((success : boolean) => {
            this.router.navigate(['/']);
        })
    }

    editMode(edit : boolean) {
        this.edit = edit;
    }

    validate(book){
        this.bookService.updateBook(book);
        this.edit = false;
    }*/
}

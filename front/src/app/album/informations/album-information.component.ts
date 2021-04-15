import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/albums';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './album-information.component.html'
})
export class AlbumInformationComponent implements OnInit {
    album$: Observable<Album>;
    edit: boolean;

    constructor(private route: ActivatedRoute,
                private albumService: AlbumService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.edit = false;
        this.album$ = this.route.paramMap.pipe(
            flatMap((params: ParamMap) => {
            const albumId = params.get('id');
            return this.albumService.getAlbum(albumId);
        }));
    }

    transform(u: string): SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl(`${environment.media}${u}`);
    }
}

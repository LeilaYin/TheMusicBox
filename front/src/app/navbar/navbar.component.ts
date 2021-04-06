import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Album } from '../models/albums';
import { AlbumService } from '../services/album.service';
import { PlaylistService } from '../services/playlist.service';
import { ArtistService } from '../services/artist.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<Album[]>;

  albums: Album[];
  navbarOpen = false;
  isLoggedIn = false;
  username?: string;
  id: any;

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private tokenStorageService: TokenStorageService,
              private albumApi: AlbumService, private playlistApi: PlaylistService, private artistApi: ArtistService,
              private router: Router) {}

  ngOnInit(): void {
    // for search bar
      this.albumApi.getAlbums().subscribe((albums) => {
        this.albums = albums;
        this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    // check if logged in to display user's name
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.pseudo;
    }
  }

  // navigate on select from the search bar
  navigateOnSelect(event: any): void{
    const selected = this.myControl.value;
    const str = selected.replace(/\d/g, '');
    const num = selected.match(/\d/g);
    this.router.navigate([str + '/' + num]);
  }

  // the filter user for the autocomplete in the search bar
  private _filter(value: string): Album[] {
    const filterValue = value.toLowerCase();
    return this.albums.filter(option => option.AlbumName.toLowerCase().indexOf(filterValue) === 0);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // to clear the interval for the search bar
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Album } from '../models/albums';
import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { PlaylistService } from '../services/playlist.service';
import { ArtistService } from '../services/artist.service';
import { SongService } from '../services/song.service';
import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  myControl = new FormControl();
  filteredOptionsAlbum: Observable<Album[]>;
  filteredOptionsArtist: Observable<Artist[]>;
  filteredOptionsPlaylist: Observable<Playlist[]>;
  filteredOptionsSong: Observable<Song[]>;
  

  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  songs: Song[];
  navbarOpen = false;
  isLoggedIn = false;
  username?: string;
  id: any;

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private tokenStorageService: TokenStorageService,
              private albumApi: AlbumService, private playlistApi: PlaylistService, private artistApi: ArtistService,
              private router: Router, private songApi: SongService) {}

  ngOnInit(): void {
    // for search bar
      this.albumApi.getAlbums().subscribe((albums) => {
        this.albums = albums;
        this.filteredOptionsAlbum = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAlbum(value))
      );
      
    });

    this.artistApi.getArtists().subscribe((artists)=>{
      this.artists = artists;
        this.filteredOptionsArtist = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterArtist(value))
      );
    }) ;

    this.playlistApi.getPlaylists().subscribe((p)=>{
      this.playlists = p;
        this.filteredOptionsPlaylist = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterPlaylist(value))
      );
    }) ;

    this.songApi.getSongs().subscribe((s)=>{
      this.songs = s;
        this.filteredOptionsSong = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSong(value))
      );
    }) ;

    // check if logged in to display user's name
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.pseudo;
    }
  }

  // navigate on select from the search bar
  navigateOnSelectAlbum(event: any): void{
    const selected = this.myControl.value;
    const str = selected.replace(/\d/g, '');
    const num = selected.match(/\d/g);
    this.router.navigate(['album' + '/' + num]);
  }

  /*navigateOnSelectArtist(event: any): void{
    const selected = this.myControl.value;
    const str = selected.replace(/\d/g, '');
    const num = selected.match(/\d/g);
    this.router.navigate(['artist' + '/' + num]);
  }*/

  // the filter user for the autocomplete in the search bar
  private _filterAlbum(value: string): Album[] {
    const filterValue = value.toLowerCase();
    return this.albums.filter(option => option.AlbumName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterArtist(value: string): Artist[] {
    const filterValue = value.toLowerCase();
    return this.artists.filter(option => option.ArtistName.toLowerCase().indexOf(filterValue) === 0);
  }
  
  private _filterPlaylist(value: string): Playlist[] {
    const filterValue = value.toLowerCase();
    return this.playlists.filter(option => option.PlaylistName.toLowerCase().indexOf(filterValue) === 0);
  }

  
  private _filterSong(value: string): Song[] {
    const filterValue = value.toLowerCase();
    return this.songs.filter(option => option.SongName.toLowerCase().indexOf(filterValue) === 0);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  onSelectAlbum(val: string): void{
    this.router.navigate(['album' + '/' + val]);
  }

  onSelectArtist(val: string): void{
    this.router.navigate(['artist' + '/' + val]);
  }

  onSelectPlaylist(val: string): void{
    this.router.navigate(['playlist' + '/' + val]);
  }

  // to clear the interval for the search bar
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}

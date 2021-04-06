import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Album } from '../models/albums';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlbumService } from '../services/album.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content?: string; //used to dispaly either public or user info
  albums: Album[];
  myControl = new FormControl();
  filteredOptions: Observable<Album[]>;

  constructor(private userService: UserService, private api: AlbumService) { }

  ngOnInit(): void {
    this.api.getAlbums().subscribe((albums)=>{
      this.albums = albums;
      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
          );
    });
    /*this.userService.getPublicContent().subscribe( data => {
      this.content = data;
    },
    err => {
      this.content = JSON.parse(err.error).message; 
    });*/
  }
  private _filter(value: string): Album[] {
    const filterValue = value.toLowerCase();
    return this.albums.filter(option => option.AlbumName.toLowerCase().indexOf(filterValue) === 0);
  }
}
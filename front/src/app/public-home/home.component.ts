import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Album } from '../models/albums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content?: string; // used to display either public or user info
  albums: Album[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    /* this.userService.getPublicContent().subscribe( data => {
      this.content = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }); */
  }
//   getUrl() { return "url('../../assets/wallpapers/wallpaper3.jpeg')"; }
}

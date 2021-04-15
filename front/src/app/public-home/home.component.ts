import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Album } from '../models/albums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content?: string; // used to display either public or user info
  albums: Album[];

  home = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: '../assets/background-large.jpg'
  };



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onClick(){
    this.router.navigate(['register'])
  }
}

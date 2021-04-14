import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/albums';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}


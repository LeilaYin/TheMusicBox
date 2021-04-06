import { NgModule } from '@angular/core';
import { PreloadingStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album/list/album-list.component';
import { AlbumInformationComponent } from './album/informations/album-information.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import { PlaylistInformationComponent } from './playlist/informations/playlist-information.component';
import { PlaylistListComponent } from './playlist/list/playlist-list.component';
import { HomeComponent } from './public-home/home.component';
import { UserHomeComponent } from './user-home/user-home.component'
import { ArtistListComponent } from './artist/list/artist-list.component';
import { ArtistInformationsComponent } from './artist/informations/artist-informations.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'album', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumInformationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path : 'playlist/:id', component: PlaylistInformationComponent },
  { path : 'playlist', component: PlaylistListComponent },
  { path : 'home', component: UserHomeComponent },
  { path : 'artist', component: ArtistListComponent },
  { path : 'artist/:id', component: ArtistInformationsComponent },

  { path: '', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

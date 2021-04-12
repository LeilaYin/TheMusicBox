import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
import { AuthGuardService } from './services/auth-guard.service'
import { SecurePagesService } from './services/secure-pages.service';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'userHome', component: UserHomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent, canActivate: [SecurePagesService]},
  { path: 'album', component: AlbumListComponent, canActivate: [AuthGuardService] },
  { path: 'album/:id', component: AlbumInformationComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'playlist/:id', component: PlaylistInformationComponent, canActivate: [AuthGuardService] },
  { path: 'playlist', component: PlaylistListComponent, canActivate: [AuthGuardService] },
  { path: 'artist', component: ArtistListComponent, canActivate: [AuthGuardService] },
  { path: 'artist/:id', component: ArtistInformationsComponent, canActivate: [AuthGuardService] },

  { path: '', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

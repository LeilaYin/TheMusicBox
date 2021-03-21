import { NgModule } from '@angular/core';
import { PreloadingStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album/list/album-list.component'
import { AlbumInformationComponent } from './album/informations/album-information.component'
//import {AppComponent} from './app.component';
import { PlaylistInformationComponent } from './playlist/informations/playlist-information.component';
import { PlaylistListComponent } from './playlist/list/playlist-list.component';
const routes: Routes = [
  
  { path: 'album', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumInformationComponent },
  {path : 'playlist/:id',component: PlaylistInformationComponent},
  {path : 'playlist',component: PlaylistListComponent},
  
  {path:'',redirectTo: 'album',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true,useHash: true,preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadingStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album/list/album-list.component'
import { AlbumInformationComponent } from './album/informations/album-information.component'
import {AppComponent} from './app.component';
const routes: Routes = [
  
  { path: 'album', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumInformationComponent },
  
  {path:'',redirectTo: 'album',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true,useHash: true,preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

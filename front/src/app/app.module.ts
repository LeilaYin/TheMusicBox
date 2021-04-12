import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';

// @ts-ignoret
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AlbumListComponent } from './album/list/album-list.component';
import { AlbumInformationComponent } from './album/informations/album-information.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlaylistInformationComponent } from './playlist/informations/playlist-information.component';
import { PlaylistListComponent } from './playlist/list/playlist-list.component';
import { HomeComponent } from './public-home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArtistListComponent } from './artist/list/artist-list.component';
import { ArtistInformationsComponent } from './artist/informations/artist-informations.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumInformationComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PlaylistInformationComponent,
    PlaylistListComponent,
    HomeComponent,
    UserHomeComponent,
    NavbarComponent,
    ArtistListComponent,
    ArtistInformationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: "registerImmediately" }),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [authInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

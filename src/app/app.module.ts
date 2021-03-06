import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { PalabraComponent } from './ahorcado/palabra/palabra.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AhorcadoLetraComponent } from './ahorcado/ahorcado-letra/ahorcado-letra.component';
import { AhorcadoPalabraComponent } from './ahorcado/ahorcado-palabra/ahorcado-palabra.component'; 
import { MatChipsModule } from '@angular/material/chips';
import { NavigationBarComponent } from './ahorcado/navigation-bar/navigation-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent, 
    PalabraComponent,
    AhorcadoComponent,
    AhorcadoLetraComponent,
    AhorcadoPalabraComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatGridListModule,
    MatChipsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

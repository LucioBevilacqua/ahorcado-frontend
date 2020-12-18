import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhorcadoLetraComponent } from './ahorcado/ahorcado-letra/ahorcado-letra.component';
import { AhorcadoPalabraComponent } from './ahorcado/ahorcado-palabra/ahorcado-palabra.component';

const routes: Routes = [
  { path: 'ahorcado-letra', component: AhorcadoLetraComponent },
  { path: 'ahorcado-palabra', component: AhorcadoPalabraComponent },
  { path: '', redirectTo: 'ahorcado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

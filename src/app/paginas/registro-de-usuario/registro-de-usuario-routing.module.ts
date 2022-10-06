import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDeUsuarioPage } from './registro-de-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDeUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDeUsuarioPageRoutingModule {}

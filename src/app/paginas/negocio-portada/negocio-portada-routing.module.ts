import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegocioPortadaPage } from './negocio-portada.page';

const routes: Routes = [
  {
    path: '',
    component: NegocioPortadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegocioPortadaPageRoutingModule {}

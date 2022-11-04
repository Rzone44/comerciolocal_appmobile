import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantallaVaciaParaRefrescarPage } from './pantalla-vacia-para-refrescar.page';

const routes: Routes = [
  {
    path: '',
    component: PantallaVaciaParaRefrescarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaVaciaParaRefrescarPageRoutingModule {}

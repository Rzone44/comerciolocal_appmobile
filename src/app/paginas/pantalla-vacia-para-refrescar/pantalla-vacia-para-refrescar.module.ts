import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantallaVaciaParaRefrescarPageRoutingModule } from './pantalla-vacia-para-refrescar-routing.module';

import { PantallaVaciaParaRefrescarPage } from './pantalla-vacia-para-refrescar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantallaVaciaParaRefrescarPageRoutingModule
  ],
  declarations: [PantallaVaciaParaRefrescarPage]
})
export class PantallaVaciaParaRefrescarPageModule {}

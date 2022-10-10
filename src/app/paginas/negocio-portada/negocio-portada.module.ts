import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NegocioPortadaPageRoutingModule } from './negocio-portada-routing.module';

import { NegocioPortadaPage } from './negocio-portada.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NegocioPortadaPageRoutingModule,
    ComponentesModule,
    SwiperModule
  ],
  declarations: [NegocioPortadaPage]
})
export class NegocioPortadaPageModule {}

import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioDeSesionPageRoutingModule } from './inicio-de-sesion-routing.module';

import { InicioDeSesionPage } from './inicio-de-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioDeSesionPageRoutingModule,
    ComponentesModule
  ],
  declarations: [InicioDeSesionPage]
})
export class InicioDeSesionPageModule {}

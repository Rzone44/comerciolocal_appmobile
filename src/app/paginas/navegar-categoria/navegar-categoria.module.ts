import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavegarCategoriaPageRoutingModule } from './navegar-categoria-routing.module';

import { NavegarCategoriaPage } from './navegar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    NavegarCategoriaPageRoutingModule
  ],
  declarations: [NavegarCategoriaPage]
})
export class NavegarCategoriaPageModule {}

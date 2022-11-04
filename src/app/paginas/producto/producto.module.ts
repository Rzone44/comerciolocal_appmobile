import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ProductoPageRoutingModule
  ],
  declarations: [ProductoPage]
})
export class ProductoPageModule {}

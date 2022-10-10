import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavegarSubmodulosPageRoutingModule } from './navegar-submodulos-routing.module';

import { NavegarSubmodulosPage } from './navegar-submodulos.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavegarSubmodulosPageRoutingModule,
    ComponentesModule
  ],
  declarations: [NavegarSubmodulosPage]
})
export class NavegarSubmodulosPageModule {}

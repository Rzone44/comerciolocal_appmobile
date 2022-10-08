import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisorHtmlPageRoutingModule } from './visor-html-routing.module';

import { VisorHtmlPage } from './visor-html.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisorHtmlPageRoutingModule,
    ComponentesModule
  ],
  declarations: [VisorHtmlPage]
})
export class VisorHtmlPageModule {}

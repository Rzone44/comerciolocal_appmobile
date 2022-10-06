import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ModuloComponent } from '../componentes/modulo/modulo.component';
import { BannerComponent } from '../componentes/banner/banner.component';
import { ImgSlideshowComponent } from '../componentes/img-slideshow/img-slideshow.component';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentesModule
  ],
  declarations: [HomePage, ModuloComponent, BannerComponent, ImgSlideshowComponent, ]
})
export class HomePageModule {}

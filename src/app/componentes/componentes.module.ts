import { BarraDeProductosComponent } from './barra-de-productos/barra-de-productos.component';
import { NegocioComponent } from './negocio/negocio.component';
import { ModuloComponent } from './modulo/modulo.component';
import { ImgSlideshowComponent } from './img-slideshow/img-slideshow.component';
import { BannerComponent } from './banner/banner.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:[IonicModule,  CommonModule, SwiperModule,RouterModule],
    declarations: [CabeceraComponent, SlideshowComponent, BannerComponent, ImgSlideshowComponent, ModuloComponent, NegocioComponent, BarraDeProductosComponent], 
    exports: [CabeceraComponent, SlideshowComponent, BannerComponent, ImgSlideshowComponent, ModuloComponent,NegocioComponent, BarraDeProductosComponent]
})

export class ComponentesModule{

}
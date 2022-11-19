import { MenuCategoriasComponent } from './menu-categorias/menu-categorias.component';
import { FooterCarritoComponent } from './footer-carrito/footer-carrito.component';
import { GaleriaProductoComponent } from './galeria-producto/galeria-producto.component';
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
import { ActivoPipe } from '../pipes/activo.pipe';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
    imports:[IonicModule,  CommonModule, SwiperModule,RouterModule],
    declarations: [ActivoPipe,CabeceraComponent, SlideshowComponent, BannerComponent, ImgSlideshowComponent, ModuloComponent, 
        NegocioComponent, BarraDeProductosComponent, GaleriaProductoComponent, FooterCarritoComponent, MenuCategoriasComponent,
        ProductoComponent], 
    exports: [ActivoPipe,CabeceraComponent, SlideshowComponent, BannerComponent, ImgSlideshowComponent, ModuloComponent,NegocioComponent,
         BarraDeProductosComponent, GaleriaProductoComponent, FooterCarritoComponent, MenuCategoriasComponent,
         ProductoComponent]
})

export class ComponentesModule{

}
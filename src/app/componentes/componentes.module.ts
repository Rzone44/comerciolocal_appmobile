import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@NgModule({
    imports:[IonicModule,  CommonModule, SwiperModule],
    declarations: [CabeceraComponent, ], 
    exports: [CabeceraComponent, ]
})

export class ComponentesModule{

}
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports:[IonicModule,  CommonModule],
    declarations: [CabeceraComponent],
    exports: [CabeceraComponent]
})

export class ComponentesModule{

}
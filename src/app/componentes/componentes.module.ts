import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NgModule } from "@angular/core";

@NgModule({
    imports:[CommonModule],
    declarations: [CabeceraComponent],
    exports: [CabeceraComponent]
})

export class ComponentesModule{

}
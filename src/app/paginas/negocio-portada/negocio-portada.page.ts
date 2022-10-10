import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERPApiService } from 'src/app/servicios/erpapi.service';
import Swiper,{ Autoplay, Pagination, Navigation, Lazy, EffectFade } from "swiper";


Swiper.use([Autoplay, Pagination, Navigation, Lazy,EffectFade]);
@Component({
    selector: 'app-negocio-portada',
    templateUrl: './negocio-portada.page.html',
    styleUrls: ['./negocio-portada.page.scss'],
})
export class NegocioPortadaPage implements OnInit {

    nombre_negocio: string;
    negocio: any = {
        banner_principal: [],
        banner_secundario: []
    };
     conjuntos = [{
        productos:[]
     }];

    constructor(
        private api: ERPApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(async params => {
            this.nombre_negocio = params.negocio;
            this.api.getDoctype('CL_Negocio', this.nombre_negocio).subscribe(res =>{
                this.negocio = res;
                document.documentElement.style.setProperty('--ion-color-primary', this.negocio.color_fondo_primario);
                document.documentElement.style.setProperty('--ion-color-primary-contrast', this.negocio.color_texto_primario);
            });
          
        });
    }

}

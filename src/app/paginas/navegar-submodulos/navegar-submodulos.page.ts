import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-navegar-submodulos',
    templateUrl: './navegar-submodulos.page.html',
    styleUrls: ['./navegar-submodulos.page.scss'],
})
export class NavegarSubmodulosPage implements OnInit {
    modulo: any;
    modulo_name: any;
    submodulos: any;
    negocios: any = undefined;

    constructor(
        private api: ERPApiService,
        private activatedRoute: ActivatedRoute,
    ) { 
        this.negocios = undefined;
    }


    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(async params => {
            if (params.json) {
                this.modulo_name = JSON.parse(params.json).modulo;
                /* OBTENER SUBMODULO */
                this.api.getList('CL_Modulos',
                    '"*"',
                    '[["estado","=","Activo"],["modulo_padre","=","' + encodeURIComponent(this.modulo_name) + '"]]').subscribe(res => {
                        this.submodulos = res.length == 0 ? [] : res;
                    });
                /* OBTENER CONFIGURACION DEL MODULO ACTUAL */
                this.api.getDoctype('CL_Modulos', this.modulo_name).subscribe(res => {
                    this.modulo = res;
                    /* OBTENER NEGOCIOS */
                    let giros = '';
                    res.giros_comerciales.forEach(g => {
                        giros += '["CL_Negocio_Giros","tipo_de_producto_ofrecido", "=", "' + encodeURIComponent(g.girocomercial) + '"],';
                    });
                    if (giros != '') {
                        this.api.getList(
                            'CL_Negocio',
                            '"*"',
                            `[["CL_Negocio","docstatus", "=", "0"]]`,
                            `[${giros.substring(0, giros.length - 1)}]`
                        ).subscribe(res => {
                            this.negocios = res.length == 0 ? [] : res;
                        });
                    }else{
                        this.negocios = undefined;
                    }
                });
            }
        });

    }


}

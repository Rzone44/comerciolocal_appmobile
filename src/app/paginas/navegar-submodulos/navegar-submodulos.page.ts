import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-navegar-submodulos',
    templateUrl: './navegar-submodulos.page.html',
    styleUrls: ['./navegar-submodulos.page.scss'],
})
export class NavegarSubmodulosPage implements OnInit {
    modulo: any ={
        banner_principal : [],
        banner_secundario : []
    };
    modulo_name: any;
    submodulos = [];
    negocios = [];

    constructor(
        private api: ERPApiService,
        private activatedRoute: ActivatedRoute
    ) { }


    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(async params => {
            if (params.json){
                this.modulo_name = JSON.parse(params.json).modulo;
                console.log("Navegando en "+this.modulo_name);
                /* OBTENER SUBMODULO */
                this.api.getList('CL_Modulos',
                '"*"',
                '[["estado","=","Activo"],["modulo_padre","=","' + this.modulo_name + '"]]').subscribe(res => {
                    this.submodulos = res.length == 0 ? [] : res;
                    console.log(res);
                });

                 /* OBTENER CONFIGURACION DEL MODULO ACTUAL */
                 this.modulo = await this.api.getDoctype('CL_Modulos',this.modulo_name).pipe(res => {
                    return res;
                }).toPromise();

                /* OBTENER NEGOCIOS */
                //TODO: amarrar giros y modulos o comercios y modulos 
                this.api.getList('CL_Negocio',
                '"*"',
                `[\
                    ["CL_Negocio","docstatus", "=", "0"],\
                    ["CL_Negocio_Giros","tipo_de_producto_ofrecido", "=", "${this.modulo.titulo}"]\
                ]`).subscribe(res => {
                    this.negocios = res.length == 0 ? [] : res;
                    console.log(res);
                });

                
               
            }
        });
       
    }

}

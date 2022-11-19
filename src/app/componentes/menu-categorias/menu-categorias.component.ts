import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-menu-categorias',
    templateUrl: './menu-categorias.component.html',
    styleUrls: ['./menu-categorias.component.scss'],
})
export class MenuCategoriasComponent implements OnInit {

    @Input() idNegocio: string
    class: string = "d-none";
    categorias: any = [];
    interval: number;
    constructor(
        public api: ERPApiService
    ) { }

    ngOnInit() {
        this.ObtenerCategorias(this.idNegocio);
    }

    ObtenerCategorias(idNegocio) {
        this.api.getList('CL_CategoriaDeProducto', '"*"', '[["negocio","=","' + encodeURIComponent(idNegocio) + '"]]').subscribe(res => {
            this.categorias = res;
        }, error =>{
            switch (error.status) {
                case 500:
                    console.log('El negocio no tiene categorias');
                    break;
                default:
                    break;
            }
        });
    }

    CategoriasDeCategoriaPadre(categoriaPadre) {
        let cat = [];
        if (this.categorias.length == 0)
            return cat;
        if (categoriaPadre == '') {
            cat = this.categorias.filter(c => c.categoria_superior == categoriaPadre || c.categoria_superior == null);
        } else {
            cat = this.categorias.filter(c => c.categoria_superior == categoriaPadre);
        }
        return cat;
    }

    CategoriaTieneHijos(idCategoria) {
        return (this.categorias.filter(c => c.categoria_superior == idCategoria).length > 0);
    }

    hide(){
        this.class="d-none";
    }
    show(){
        this.class="";
    }
  
}

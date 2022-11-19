import { Location } from '@angular/common';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERPApiService } from 'src/app/servicios/erpapi.service';
import { AppModule } from 'src/app/app.module';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

    ERP_API_URI : string = AppModule.ERP_API_URI;
    items: any = [];
    negocios: any= [];
    constructor(
        public router: Router,
        private carrito: CarritoService,
        private api: ERPApiService
    ) { }

    ngOnInit() {
        this.items = this.carrito.getCarrito().filter(e => e.Cantidad > 0);
        this.items.forEach(item => {
            if(this.negocios.find(e => e.idTienda == item.idTienda) == undefined)
                this.negocios.push({
                    idTienda: item.idTienda,
                    Tienda: item.Tienda,
                });
        })
    }

    async editarProducto(item, index){
        let clon = JSON.parse(JSON.stringify(item));
        clon.Variante = JSON.stringify(clon.Variante);
        clon.Configuracion = JSON.stringify(clon.Configuracion);
        clon.indice = index;
        //this.router.navigate(['/producto-editar'],{ queryParams: clon, replaceUrl: true});
        this.router.navigate(['/producto'],{ queryParams: clon});
    }

    menosUno(item){
       item.Cantidad = item.Cantidad-1;
       this.carrito.updProducto(item);
       this.ngOnInit()
    //    console.log('%c TODO menosUno','color:#9A7FCA;');
    }
    masUno(item){
        item.Cantidad = item.Cantidad+1;
       this.carrito.updProducto(item);
       this.ngOnInit()
        // console.log('%c TODO masUno','color:#9A7FCA;');
    }
    eliminarProducto(item){
        this.carrito.rmItem(item);
        this.ngOnInit()
    }

    ObtenerValorDeConfiguracion(config){
        switch (config.seleccion) {
            case true:
                return 'Sí';
                break;
            case false:
                return 'No';
                break;
            default:
                return  config.valores.find(v => v.costo == config.seleccion).valor
                break;
        }
    }

}

import { CarritoService } from './../../../../../IonicExamples/src/app/servicios/carrito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

    items: any = [
        {
            "Precio": 50,
            "idTienda": "Paisa Intl.",
            "Tienda": "Paisa Intl.",
            "idUOM": "pieza",
            "idProducto": "Sudadera Grullense 2022_Paisa Intl.",
            "Cantidad": 3,
            "UOM": "pieza",
            "Producto": "Sudadera Grullense Sobre Pedido"
        },
        {
            "Precio": 50,
            "idTienda": "Paisa Intl.",
            "Tienda": "Paisa Intl.",
            "idUOM": "pieza",
            "idProducto": "Taza tío rija_Paisa Intl.",
            "Cantidad": 1,
            "UOM": "pieza",
            "Producto": "Taza tío rija"
        },
        {
            "Precio": 50,
            "idTienda": "Paisa Intl.",
            "Tienda": "Paisa Intl.",
            "idUOM": "pieza",
            "idProducto": "Sudadera Grullense_Paisa Intl.",
            "idVariante": "Tal-Chi_ColDePre-Neg_ColDeTex-Azu",
            "Cantidad": 2,
            "UOM": "pieza",
            "Producto": "Sudadera Grullense",
            "Variante": {
                "atributo1_titulo": "Talla",
                "atributo1_id": "686fe0cbbf",
                "atributo1_valor": "Chica",
                "atributo2_titulo": "Color de prenda",
                "atributo2_id": "09dbca7d86",
                "atributo2_valor": "Negra",
                "atributo3_titulo": "Color de texto",
                "atributo3_id": "5b113f3e95",
                "atributo3_valor": "Azul",
                "producto": "Sudadera Grullense"
            }
        }
    ];
    negocios: any= [{
        "idTienda": "Paisa Intl.",
        "Tienda": "Paisa Intl."
    }];
    constructor(
        public router: Router,
        private carrito: CarritoService,
        private api: ERPApiService
    ) { }

    ngOnInit() {
        //this.items = this.carrito.getCarrito();
        this.items.forEach(item => {
            if(this.negocios.find(e => e.idTienda == item.idTienda)== undefined)
                this.negocios.push({
                    idTienda: item.idTienda,
                    Tienda: item.Tienda,
                });
        })
    }

    async editarProducto(item){
        let negocio = await this.api.getDoctype('CL_Negocio',item.idTienda).pipe(res => {
            return res;
        }).toPromise();
        console.log(2);
        let producto = await this.api.getDoctype('CL_Producto',item.idProducto).pipe(res => {
            return res;
        }).toPromise();
        localStorage.setItem('negocio', JSON.stringify(negocio));
        localStorage.setItem('producto', JSON.stringify(producto));
        this.router.navigateByUrl('/pantalla-vacia-para-refrescar', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/producto']);
        }); 
    }

}

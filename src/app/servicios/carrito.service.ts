import { ActivoPipe } from './../pipes/activo.pipe';
import { ProductoComponent } from './../componentes/producto/producto.component';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    getItems(item: any) {
        return this.carrito.filter(p =>
            p.idProducto == item.idProducto &&
            p.idVariante == item.idVariante 
        );
    }

    getCantidadTotal(): number {
        return this.carrito.length;
    }
    
    private carrito = [];

    constructor(
    ) { 
        this.carrito = localStorage.getItem('Carrito') != null ? 
                            JSON.parse(localStorage.getItem('Carrito')) :
                            [];
    }

    getCarrito() {
        return this.carrito;
    }

    
    updProducto(item:CartItem, accion: 'agregar'|'actualizar' = 'actualizar', ignorarExistencia: boolean = false, itemAReemplazar: CartItem = undefined) {
        let cart_item = undefined;
        if (itemAReemplazar == undefined) {
            cart_item = this.carrito.find(p =>
                p.idProducto == item.idProducto &&
                p.idVariante == item.idVariante
            );
        } else {
            cart_item = this.carrito.find(p =>
                p.idProducto == itemAReemplazar.idProducto &&
                p.idVariante == itemAReemplazar.idVariante &&
                JSON.stringify(p.Configuracion) == JSON.stringify(itemAReemplazar.Configuracion)
            );
        }

        if (cart_item == undefined){
            this.carrito.push(JSON.parse(JSON.stringify(item)));
        }
        else {
            if (ignorarExistencia) {
                this.carrito.push(JSON.parse(JSON.stringify(item)));
            } else {
                if (accion === 'agregar') {
                    cart_item.Cantidad += item.Cantidad;
                } else {
                    cart_item.Cantidad = item.Cantidad;
                }  

                if (item.Configuracion!= undefined) {
                    cart_item.Configuracion = JSON.parse(JSON.stringify(item.Configuracion))
                }
            }
        }
        localStorage.setItem('Carrito', JSON.stringify(this.getCarrito()));
        return cart_item;
    }

    rmItem(item:CartItem) {
        let pr = this.carrito.find(p =>
            p.idProducto === item.idProducto &&
            p.idVariante === item.idVariante &&
            JSON.stringify(p.Configuracion) == JSON.stringify(item.Configuracion)
        );
        const indx = this.carrito.findIndex(e => e === pr);
        if (indx > -1) {
            this.carrito.splice(indx, 1);
        }
        localStorage.setItem('Carrito', JSON.stringify(this.getCarrito()));
    }

    getCantidad(idProductName: any, idVarianteCode: any) {
        let cart_item = this.carrito.find(p =>
            p.idProducto == idProductName &&
            p.idVariante == idVarianteCode
        );
        return cart_item == undefined ? 0 : cart_item.Cantidad;
    }

    rmCarrito() {
        this.carrito = [];
    }   
}


class CartItem {

    public idTienda : string;
    public Tienda : string;
    public Cantidad : number;
    public idUOM : string;
    public UOM : string;
    public idProducto : string;
    public Producto : string;
    public idVariante : string;
    public Variante : string;
    public PrecioUnitario : number;
    public Imagen : string;
    public Configuracion : any;

    constructor(idTienda: string, Tienda: string, Cantidad: number,idUOM: string, UOM: string, idProducto: string, Producto: string, idVariante: string, Variante: any, PrecioUnitario: number, Imagen: string, Configuracion: any) {
        this.idTienda = idTienda;
        this.Tienda = Tienda;
        this.Cantidad = Cantidad;
        this.idUOM = idUOM;
        this.UOM = UOM;
        this.idProducto = idProducto;
        this.Producto = Producto;
        this.idVariante = idVariante;
        this.Variante = Variante;
        this.PrecioUnitario = PrecioUnitario;
        this.Imagen = Imagen;
        this.Configuracion = Configuracion;
    }
}
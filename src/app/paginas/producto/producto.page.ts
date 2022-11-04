import { CarritoService } from './../../../../../IonicExamples/src/app/servicios/carrito.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
    

    producto: any;
    uom: string = 'pieza'; //TODO: Hacer esto dinamico a traves del producto y variable
    negocio: any;
    ERP_API_URI: string;
    cantidadParaAgregar: number = 0;
    variante:any = undefined;
    variante1: string;
    variante2: string;
    variante3: string;
    variante4: string;
    precio: any;
    sePuedeComprar = false;

    constructor(
        private api: ERPApiService,
        private carrito: CarritoService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        // this.activatedRoute.queryParams.subscribe(async params => {
            // if (params.idProducto != undefined){
            //     this.negocio = await this.api.getDoctype('CL_Negocio',params.idTienda).pipe(res => {
            //         return res;
            //     }).toPromise();
            //     this.producto = await this.api.getDoctype('CL_Producto',params.idProducto).pipe(res => {
            //         return res;
            //     }).toPromise();
            //     localStorage.setItem('negocio', JSON.stringify(this.negocio));
            //     localStorage.setItem('producto', JSON.stringify(this.producto));
            // }else{
                this.producto = JSON.parse(localStorage.getItem('producto'));
                this.negocio = JSON.parse(localStorage.getItem('negocio'));
            // }
             this.loadProduct();
        // });
    }
    loadProduct() {
        this.precio = this.producto.precio;
        this.producto.variantes.forEach(v => {
            v.atributos = JSON.parse(v.variante);
        });
       
        this.ERP_API_URI = AppModule.ERP_API_URI;
        if (this.producto.activo) {
            if (this.producto.inventario_necesario) {
                this.api.callMethod('comercio_local.ws.obtenerStock', { "producto": this.producto.name }).subscribe(res => {
                    if (this.producto.tipo_de_producto == "Con variantes") {
                        res.message.forEach(alamcen => {
                            let codigoVariante = alamcen[3];
                            let stockVariante = alamcen[4];
                            let variante = this.producto.variantes.find(v => v.codigo == codigoVariante && v.disponible == 1);
                            if (variante.stockMaximo == undefined) {
                                variante.stockMaximo = stockVariante;
                            } else {
                                variante.stockMaximo += stockVariante;
                            }
                        });
                        this.producto.variantes = this.producto.variantes.filter(v => v.stockMaximo != undefined);

                    } else {
                        //TODO: Decidir si se va a dejar el stock maximo por suma de almacenes o se revisara por stock de almacen
                        this.producto.stockMaximo = 0;
                        res.message.forEach(alamcen => {
                            this.producto.stockMaximo += alamcen[4];
                        });
                        this.sePuedeComprar = this.producto.stockMaximo > 0;
                    }
                    //debugger;
                });

            } else {
                //El producto no requiere inventario
                this.sePuedeComprar = true;
            }
        } else {
            //El producto esta inactivo
            this.sePuedeComprar = false;
        }
        this.verificarCantidadEnCarrito();
    }

    agregarACarrito() {
        this.cantidadParaAgregar += 1;
        this.carrito.updProducto(
            this.negocio.name,
            this.negocio.nombre,
            this.cantidadParaAgregar, 
            this.uom, 
            this.uom, 
            this.producto.name,
            this.producto.nombre,
            this.variante == undefined ? undefined : this.variante.codigo,
            this.variante == undefined ? undefined : JSON.parse(this.variante.variante)
            );
       
    }
    restarACarrito() {
        this.cantidadParaAgregar -= 1;
        this.carrito.updProducto( 
            this.negocio.name,
            this.negocio.nombre,
            this.cantidadParaAgregar, 
            this.uom, 
            this.uom, 
            this.producto.name,
            this.producto.nombre,
            this.variante == undefined ? undefined : this.variante.codigo,
            this.variante == undefined ? undefined : JSON.parse(this.variante.variante)
            );
    }

    verificarVariable(e) {
        let variantesDisponibles = this.producto.variantes.filter(v => {
            v.atributos = JSON.parse(v.variante);
            if (
                v.atributos.atributo1_valor == this.variante1 &&
                v.atributos.atributo2_valor == this.variante2 &&
                v.atributos.atributo3_valor == this.variante3 &&
                v.atributos.atributo4_valor == this.variante4
                ) {
                return v;
            }
        });
        if (variantesDisponibles.length == 1) {
            this.variante = variantesDisponibles[0];
            if (this.variante.disponible == 1) {
                if (this.variante.stockMaximo > 0) {
                    this.sePuedeComprar = true;
                } else {
                    this.sePuedeComprar = false;
                }
            } else {
                this.sePuedeComprar = false;
            }

            if (this.producto.usar_mismo_precio_en_varianes == 1) {
                //Se mantiene el precio del producto
            }else{
                this.precio = variantesDisponibles[0].precio
            }

            //Verificar cantidad en carrito
            this.verificarCantidadEnCarrito();
        }else{
            //hay mas de una variante, el usuario debe elegir mas atributos
        }
        //debugger;
    }

    verificarCantidadEnCarrito(){
        this.cantidadParaAgregar = this.carrito.getCantidad(this.producto.name, this.variante == undefined ? undefined : this.variante.codigo);
    }
}

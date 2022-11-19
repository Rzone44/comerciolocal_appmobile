import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FooterCarritoComponent } from 'src/app/componentes/footer-carrito/footer-carrito.component';
import { GaleriaProductoComponent } from 'src/app/componentes/galeria-producto/galeria-producto.component';
import { MenuCategoriasComponent } from 'src/app/componentes/menu-categorias/menu-categorias.component';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-producto-editar',
    templateUrl: './producto-editar.page.html',
    styleUrls: ['./producto-editar.page.scss'],
})
export class ProductoEditarPage implements OnInit {

    @ViewChild(MenuCategoriasComponent) menu: MenuCategoriasComponent;
    @ViewChild(FooterCarritoComponent) footer: FooterCarritoComponent;
    @ViewChild(GaleriaProductoComponent) galeria: GaleriaProductoComponent;

    producto: any;
    negocio: any;
    nombre_negocio: string;
    uom: string = 'pieza'; //TODO: Hacer esto dinamico a traves del producto y variable
    ERP_API_URI: string;
    cantidadParaAgregar: number = 0;
    variante: any = undefined;
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
        this.activatedRoute.queryParams.subscribe(async params => {
            if (params.idProducto != undefined) {
                this.nombre_negocio =  params.idTienda;
                this.negocio = await this.api.getDoctype('CL_Negocio', params.idTienda).pipe(res => {
                    return res;
                }).toPromise();
                this.producto = await this.api.getDoctype('CL_Producto', params.idProducto).pipe(res => {
                    return res;
                }).toPromise();

                if(params.Variante != undefined){
                    let parametros_Variante = JSON.parse(params.Variante);
                    this.variante1 = parametros_Variante.atributo1_valor;
                    this.variante2 = parametros_Variante.atributo2_valor;
                    this.variante3 = parametros_Variante.atributo3_valor;
                    this.variante4 = parametros_Variante.atributo4_valor;
                    this.VerificarVariable(undefined);
                }else{
                    this.VarificarProducto();
                }

            }
        });
    }

    VarificarProducto() {
        this.precio = this.producto.precio;
        this.producto.variantes.forEach(v => {
            v.atributos = JSON.parse(v.variante);
        });

        this.ERP_API_URI = AppModule.ERP_API_URI;
        if (this.producto.activo) {
            if (this.producto.inventario_necesario) {
                this.ActualizarStock();
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

    VerificarVariable(e) {
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
            this.ActualizarStock(this.variante);
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
            } else {
                this.precio = variantesDisponibles[0].precio
            }

            //Verificar cantidad en carrito
            this.verificarCantidadEnCarrito();
        } else {
            //hay mas de una variante, el usuario debe elegir mas atributos
            this.sePuedeComprar = false;
        }
        //debugger;
    }

    async ActualizarStock(cur_variante: any = undefined) {
        let res = await this.api.callMethod('comercio_local.ws.obtenerStock', { "producto": this.producto.name }).pipe(res => {
            return res;
        }).toPromise();
        if (this.producto.tipo_de_producto == "Con variantes") {
            if (cur_variante == undefined) {
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
            }
            else {
                this.variante.stockMaximo = res.message.filter(i => i[3] == cur_variante.codigo).reduce((acc, cur) => acc + cur[4], 0);
                this.sePuedeComprar = this.variante.stockMaximo > 0;
            }
            this.producto.variantes = this.producto.variantes.filter(v => v.stockMaximo != undefined);

        } else {
            //TODO: Decidir si se va a dejar el stock maximo por suma de almacenes o se revisara por stock de almacen
            this.producto.stockMaximo = 0;
            res.message.forEach(alamcen => {
                this.producto.stockMaximo += alamcen[4];
            });
            this.sePuedeComprar = this.producto.stockMaximo > 0;
        }
    }

    verificarCantidadEnCarrito() {
        this.cantidadParaAgregar = this.carrito.getCantidad(this.producto.name, this.variante == undefined ? undefined : this.variante.codigo);
    }

    agregarACarrito() {
        // this.cantidadParaAgregar += 1;
        // this.carrito.updProducto(
        //     this.negocio.name,
        //     this.negocio.nombre,
        //     this.cantidadParaAgregar,
        //     this.uom,
        //     this.uom,
        //     this.producto.name,
        //     this.producto.nombre,
        //     this.producto.tipo_de_producto == 'Simple' ? undefined : this.variante.codigo,
        //     this.producto.tipo_de_producto == 'Simple' ? undefined : JSON.parse(this.variante.variante),
        //     this.producto.tipo_de_producto == 'Simple' ? this.producto.precio : this.producto.usar_mismo_precio_en_varianes == 1 ? this.producto.precio : this.variante.precio,
        //     this.producto.tipo_de_producto == 'Simple' ? this.producto.imagen : this.variante.imagen == undefined ? this.producto.imagen : this.variante.imagen
        // );

    }
    restarACarrito() {
        // this.cantidadParaAgregar -= 1;
        // this.carrito.updProducto(
        //     this.negocio.name,
        //     this.negocio.nombre,
        //     this.cantidadParaAgregar,
        //     this.uom,
        //     this.uom,
        //     this.producto.name,
        //     this.producto.nombre,
        //     this.producto.tipo_de_producto == 'Simple' ? undefined : this.variante.codigo,
        //     this.producto.tipo_de_producto == 'Simple' ? undefined : JSON.parse(this.variante.variante),
        //     this.producto.tipo_de_producto == 'Simple' ? this.producto.precio : this.producto.usar_mismo_precio_en_varianes == 1 ? this.producto.precio : this.variante.precio,
        //     this.producto.tipo_de_producto == 'Simple' ? this.producto.imagen : this.variante.imagen == undefined ? this.producto.imagen : this.variante.imagen
        // );
    }

    ionViewDidEnter(){
        this.footer.menu = this.menu;
        this.galeria.ngOnInit();
    }
}
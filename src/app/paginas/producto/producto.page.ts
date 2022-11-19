import { GaleriaProductoComponent } from 'src/app/componentes/galeria-producto/galeria-producto.component';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ERPApiService } from 'src/app/servicios/erpapi.service';
import { MenuCategoriasComponent } from 'src/app/componentes/menu-categorias/menu-categorias.component';
import { FooterCarritoComponent } from 'src/app/componentes/footer-carrito/footer-carrito.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CabeceraComponent } from 'src/app/componentes/cabecera/cabecera.component';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

    @ViewChild(MenuCategoriasComponent) menu: MenuCategoriasComponent;
    @ViewChild(CabeceraComponent) header: CabeceraComponent;
    @ViewChild(FooterCarritoComponent) footer: FooterCarritoComponent;
    @ViewChild(GaleriaProductoComponent) galeria: GaleriaProductoComponent;

    producto: any;
    negocio: any;
    uom: string = 'pieza'; //TODO: Hacer esto dinamico a traves del producto y variable
    ERP_API_URI: string;
    cantidadParaAgregar: number = 0;
    variante: any;
    variante1: string;
    variante2: string;
    variante3: string;
    variante4: string;
    precio: any;
    sePuedeComprar = false;
    //TODO: Revisar como acomodar para evitar que el usuario tenga que hacer seleccion de todo para saber si se puede o no comprar
    valoresConfiguraciones: any = [];
    ProductoConfigurable_Configuraciones: any;
    stock: any = {
        minimo: 0,
        maximo: 1000
    };
    estaEnCarrito: boolean = false;


    constructor(
        private api: ERPApiService,
        private carrito: CarritoService,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private alertController: AlertController,
    ) { }


    ngOnInit() {
        return this.activatedRoute.queryParams.subscribe(async params => {
            this.api.getDoctype('CL_Producto', params.idProducto).subscribe(async res => {
                this.producto = res;
                this.api.getDoctype('CL_Negocio', this.producto.negocio).subscribe(res => {
                    this.negocio = res;
                });
                if (this.producto.configuracion.length !== undefined) {
                    this.ObtenerConfiguraciones(this.producto.configuracion);
                }
                this.ValidarDisponibilidad();
                this.VerificarPrecio();
                this.MarcarVariables();
                if (Object.keys(params).length > 1) {
                    this.CargarValores(params);
                }
            });
        });

    }
    CargarValores(item: any) {
        //TODO: Cargar item
        if(item.Variante != undefined){
            let parametros_Variante = JSON.parse(item.Variante);
            this.variante1 = parametros_Variante.atributo1_valor;
            this.variante2 = parametros_Variante.atributo2_valor;
            this.variante3 = parametros_Variante.atributo3_valor;
            this.variante4 = parametros_Variante.atributo4_valor;
            this.verificarVariable(undefined);
        }

        if (item.Configuracion != undefined) {
            this.ProductoConfigurable_Configuraciones = JSON.parse(item.Configuracion);
            this.ConfiguracionModificada(undefined);
        }
        console.log('%c TODO Cargar item','color:#9A7FCA;');
    }

    async ValidarDisponibilidad() {
        if (this.producto.activo == 1) {
            switch (this.producto.tipo_de_producto) {
                case 'Simple':
                    if (this.producto.inventario_necesario == 1) {
                        await this.ActualizarStock();
                        this.sePuedeComprar = this.producto.stockMaximo > 0;
                    } else {
                        this.sePuedeComprar = true;
                    }
                    break;
                case 'Con variantes':
                    this.ObtenerVarianteElegida();
                    if (this.variante == undefined) {
                        this.sePuedeComprar = false;
                    } else {
                        if (this.variante.disponible == 1) {
                            if (this.producto.inventario_necesario == 1) {
                                await this.ActualizarStock(this.variante);
                                this.sePuedeComprar = this.variante.stockMaximo > 0;
                            } else {
                                this.sePuedeComprar = true;
                            }
                        } else {
                            this.sePuedeComprar = false;
                        }
                    }
                    break;
                case 'Configurable':
                    if (this.producto.inventario_necesario == 1) {
                        await this.ActualizarStock();
                        this.sePuedeComprar = this.producto.stockMaximo > 0;
                    } else {
                        this.sePuedeComprar = true;
                    }
                    break;
                default:
                    this.sePuedeComprar = false;
                    break;
            }
        } else {
            this.sePuedeComprar = false;
        }

        if (this.sePuedeComprar && this.producto.tipo_de_producto != 'Configurable') {
            this.verificarCantidadEnCarrito()
        } else {
            //El producto no se podra mostrar
        }
    }

    verificarCantidadEnCarrito() {
        let cantidadEnCarrito = this.carrito.getCantidad(this.producto.name, this.variante == undefined ? undefined : this.variante.codigo);
        this.cantidadParaAgregar = cantidadEnCarrito;
        this.estaEnCarrito = cantidadEnCarrito > 0;
    }

    async ActualizarStock(cur_variante: any = undefined) {
        let res = await this.api.callMethod('comercio_local.ws.obtenerStock', { "producto": this.producto.name }).pipe(res => {
            return res;
        }).toPromise();

        //El Stock Maximo considera todos los almacenes
        if (cur_variante == undefined) {
            this.producto.stockMaximo = res.message.filter(i => i[2] == this.producto.name).reduce((acc, cur) => acc + cur[4], 0);;
            this.stock.maximo = this.producto.stockMaximo;
        } else {
            this.variante.stockMaximo = res.message.filter(i => i[3] == cur_variante.codigo).reduce((acc, cur) => acc + cur[4], 0);
            this.stock.maximo = this.variante.stockMaximo;
        }
    }

    ObtenerVarianteElegida() {
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
        } else {
            this.variante = undefined;
        }
    }

    VerificarPrecio() {
        switch (this.producto.tipo_de_producto) {
            case "Simple":
                this.precio = this.producto.precio;
                break;
            case "Con variantes":
                if (this.producto.usar_mismo_precio_en_varianes == 1) {
                    this.precio = this.producto.precio;
                } else {
                    this.precio = this.variante == undefined ? undefined : this.variante.precio;
                }
                break;
            // case 'Configurable':
            //     this.PC_actualizarPrecio(undefined);
            //     break;
            default:
                this.precio = this.producto.precio;
                break;
        }

    }

    MarcarVariables() {
        this.variante1 = undefined;
        this.variante2 = undefined;
        this.variante3 = undefined;
        this.variante4 = undefined;
    }

    ObtenerConfiguraciones(Configuraciones) {
        if (this.ProductoConfigurable_Configuraciones == undefined) {
            this.ProductoConfigurable_Configuraciones = [];
            for (let index = 0; index < Configuraciones.length; index++) {
                const c = Configuraciones[index];
                this.ProductoConfigurable_Configuraciones.push(JSON.parse(c.atributo));
                this.ProductoConfigurable_Configuraciones[index].seleccion =
                    this.ProductoConfigurable_Configuraciones[index].seleccion == undefined ?
                        (this.ProductoConfigurable_Configuraciones[index].valores.length > 2 ? '0' : false) :
                        this.ProductoConfigurable_Configuraciones[index].seleccion;
            }
        }
        else
            return this.ProductoConfigurable_Configuraciones;
    }


    /* EVENTOS DE PAGINA */

    verificarVariable(e) {
        this.ValidarDisponibilidad();
        this.VerificarPrecio();
    }

    ConfiguracionModificada(e) {
        this.PC_actualizarPrecio();
        //this.verificarCantidadEnCarrito();
    }

    PC_actualizarPrecio() {
        this.precio =
            this.producto.precio +
            this.ProductoConfigurable_Configuraciones.filter(c => c.seleccion == true)
                .reduce((acc, cur) => acc + cur.valores.filter(v => v.costo > 0)[0].costo, 0) +
            this.ProductoConfigurable_Configuraciones.filter(c => c.seleccion != true && c.seleccion != false)
                .reduce((acc, cur) => acc + parseFloat(cur.seleccion), 0);
    }


    /* AUXILIARES FRONT */
    trackByIdx(index: number, obj: any): any {
        return index;
    }

    /* CARRITO */
    agregar() {
        this.cantidadParaAgregar += 1;
    }

    restar() {
        this.cantidadParaAgregar -= 1;
        if (this.cantidadParaAgregar < 0)
            this.cantidadParaAgregar = 0;
    }

    agregarACarrito(reemplazar: undefined | true | false = undefined, itemAReemplazar: any = undefined) {
        try {
            const item = this.ObtenerItem();
            if (this.producto.tipo_de_producto == 'Configurable') {
                const itemsEnCarrito = this.carrito.getItems(item);
                if (itemsEnCarrito.length > 0) {
                    if (itemsEnCarrito.find(i => JSON.stringify(i.Configuracion) == JSON.stringify(item.Configuracion)) != undefined) {
                        this.alertProductoAgregado(this.carrito.updProducto(item, 'agregar'));
                    } else {
                        switch (reemplazar) {
                            case undefined:
                                this.alertPreguntarReemplazo(itemsEnCarrito);
                                break;
                            case true:
                                this.alertProductoAgregado(this.carrito.updProducto(item, 'actualizar', false, itemAReemplazar));
                                break;
                            case false:
                                this.alertProductoAgregado(this.carrito.updProducto(item, 'agregar', true));
                                break;
                        }
                    }
                } else {
                    this.carrito.updProducto(item);
                }
            } else {
                this.carrito.updProducto(item);
            }

            this.estaEnCarrito = true;
            if (this.footer != undefined) {
                this.footer.actualizarCantidadEnCarrito();
            }
        } catch (error) {

        }
    }

    eliminarDelCarrito() {
        this.carrito.rmItem(this.ObtenerItem());
        this.estaEnCarrito = false;
    }

    ObtenerItem() {
        let item = undefined;
        switch (this.producto.tipo_de_producto) {
            case 'Simple':
                item = {
                    idTienda: this.negocio.name,
                    Tienda: this.negocio.nombre,
                    Cantidad: this.cantidadParaAgregar,
                    idUOM: this.uom,
                    UOM: this.uom,
                    idProducto: this.producto.name,
                    Producto: this.producto.nombre,
                    idVariante: undefined,
                    Variante: undefined,
                    PrecioUnitario: this.producto.precio,
                    Imagen: this.producto.imagen
                };
                break;
            case 'Con variantes':
                item = {
                    idTienda: this.negocio.name,
                    Tienda: this.negocio.nombre,
                    Cantidad: this.cantidadParaAgregar,
                    idUOM: this.uom,
                    UOM: this.uom,
                    idProducto: this.producto.name,
                    Producto: this.producto.nombre,
                    idVariante: this.variante.codigo,
                    Variante: JSON.parse(this.variante.variante),
                    PrecioUnitario: this.producto.usar_mismo_precio_en_varianes == 1 ? this.producto.precio : this.variante.precio,
                    Imagen: this.variante.imagen == undefined ? this.producto.imagen : this.variante.imagen
                };
                break;
            case 'Configurable':
                item = {
                    idTienda: this.negocio.name,
                    Tienda: this.negocio.nombre,
                    Cantidad: this.cantidadParaAgregar,
                    idUOM: this.uom,
                    UOM: this.uom,
                    idProducto: this.producto.name,
                    Producto: this.producto.nombre,
                    idVariante: undefined,
                    Variante: undefined,
                    PrecioUnitario: this.precio,
                    Imagen: this.producto.imagen,
                    Configuracion: this.ProductoConfigurable_Configuraciones
                };
                break;
        }
        return item;
    }

    async alertProductoAgregado(upItem) {
        const alert = await this.alertController.create({
            header: '¡Producto agregado al carrito!',
            message: `Se añadió <strong> ${this.cantidadParaAgregar} ${this.producto.nombre} </strong> ${this.cantidadParaAgregar != upItem.Cantidad ? `, ahora tienes ${upItem.Cantidad} en` : 'a'} tu carrito.`,
            buttons: [
                {
                    text: 'Seguir comprando',
                    handler: () => {
                        this.router.navigate(['/negocio-portada'], { queryParams: { negocio: this.negocio.name } });
                    }
                },
                {
                    text: 'Ir al carrito',
                    handler: () => {
                        this.router.navigate(['/carrito']);
                    }
                }
            ]
        });

        await alert.present();
    }

    async alertPreguntarReemplazo(itemsEnCarrito) {
        const alert = await this.alertController.create({
            header: 'Productro similar',
            message: `Tienes ${itemsEnCarrito.length} producto${itemsEnCarrito.length > 1 ? 's' : ''} "${this.producto.nombre}"
             con una configuración distinta en el carrito. 
             ¿Qué deseas hacer?`,
            inputs: itemsEnCarrito.map((element, index) => {
                let _label = element.Configuracion.filter(c => { if (/*c.seleccion != '0' &&*/ c.seleccion !== false) return c; })
                    .map(c => {
                        return c.atributo +
                            (c.seleccion == true ? '' : ': ' + c.valores.find(v => v.costo == c.seleccion).valor)
                    }).join(', ');

                return {
                    type: 'radio',
                    label: _label == '' ? 'Producto base' : _label,
                    value: index,
                    name: 'radio_' + index,
                    cssClass: 'ion-text-wrap',
                    class: 'ion-text-wrap',
                }
            }),
            buttons: [
                {
                    text: 'Reemplazar seleccionado',
                    role: 'replace',
                    handler: data => {
                        this.agregarACarrito(true, itemsEnCarrito[data]);
                        console.log('Reemplazo seleccionado', data);
                    },
                },
                {
                    text: 'Agregar nuevo',
                    role: 'add',
                    handler: data => {
                        this.agregarACarrito(false);
                        console.log('Agregar nuevo', data);
                    },
                },
            ],
        });

        await alert.present();

    }

    // actualizarProductoEnCarrito() {
    //     try {
    //         this.carrito.updProducto(this.ObtenerItem(), 'actualizar');
    //         this.estaEnCarrito = true;
    //         if (this.footer != undefined) {
    //             this.footer.actualizarCantidadEnCarrito();
    //         }
    //     } catch (error) {

    //     }
    // }


    cantidadModificada(e) {
        if ((this.cantidadParaAgregar < this.stock.minimo || this.cantidadParaAgregar > this.stock.maximo))
            this.cantidadParaAgregar = 0;
    }

    ionViewDidEnter() {
        if (this.negocio === undefined && this.producto === undefined) {
            /* this.router.navigate(['/home'], { replaceUrl: true});*/
        } else {
            // this.header.titulo = this.negocio.name;
            // this.header.ngOnInit();
            // this.menu.idNegocio = this.negocio.name;
            // this.menu.ngOnInit();
            this.footer.menu = this.menu;
            // this.footer.negocioActual= this.negocio.name;
            // this.footer.ngOnInit();
            // this.galeria.ngOnInit();
        }
    }

}

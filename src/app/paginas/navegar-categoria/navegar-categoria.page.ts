import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FooterCarritoComponent } from 'src/app/componentes/footer-carrito/footer-carrito.component';
import { MenuCategoriasComponent } from 'src/app/componentes/menu-categorias/menu-categorias.component';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-navegar-categoria',
    templateUrl: './navegar-categoria.page.html',
    styleUrls: ['./navegar-categoria.page.scss'],
})
export class NavegarCategoriaPage implements OnInit {

    @ViewChild(MenuCategoriasComponent) menu: MenuCategoriasComponent;
    @ViewChild(FooterCarritoComponent) footer: FooterCarritoComponent;

    productos: any = [];
    uri = AppModule.ERP_API_URI;
    negocio: any;
    today = Date.now();

    constructor(
        private api: ERPApiService,
        private activatedRoute: ActivatedRoute,
        public router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(async params => {
            if (params.categoria) {
                this.negocio = params.negocio;
                this.api.getList('CL_Producto',
                    '"*"',
                    `[\
                        ["CL_Producto","activo", "=", "1"],\
                        ["CL_Producto_Categorias","categoria", "=", "${encodeURIComponent(params.categoria)}"]\
                    ]`).subscribe(res => {
                        this.productos = res.length == 0 ? [] : res;
                        console.log(res);
                    });
            }
        });

    }
    ObtenerProductosDeLaCategoria() {

    }
    goToProduct(product) {
        //localStorage.setItem("producto", JSON.stringify(product));
        this.router.navigate(['/producto'], { queryParams: { idProducto: product.name } });
    }

    ionViewDidEnter() {
        if (this.negocio === undefined) {
            /* this.router.navigate(['/home'], { replaceUrl: true});*/
        } else {
            this.footer.menu = this.menu;
        }
    }
}

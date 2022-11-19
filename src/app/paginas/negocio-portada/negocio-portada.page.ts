import { FooterCarritoComponent } from './../../componentes/footer-carrito/footer-carrito.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuCategoriasComponent } from 'src/app/componentes/menu-categorias/menu-categorias.component';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-negocio-portada',
    templateUrl: './negocio-portada.page.html',
    styleUrls: ['./negocio-portada.page.scss'],
})
export class NegocioPortadaPage implements OnInit {
    
    @ViewChild(MenuCategoriasComponent) menu: MenuCategoriasComponent;
    @ViewChild(FooterCarritoComponent) footer: FooterCarritoComponent;

    negocio: any;

    constructor(
        private api: ERPApiService,
        private activatedRoute: ActivatedRoute,
        public router: Router
    ) { }

   
    async ngOnInit() {
        await this.activatedRoute.queryParams.subscribe(async params => {
            this.api.getDoctype('CL_Negocio', params.negocio).subscribe(res =>{
                this.negocio = res;
                document.documentElement.style.setProperty('--ion-color-primary', this.negocio.color_fondo_primario);
                document.documentElement.style.setProperty('--ion-color-primary-contrast', this.negocio.color_texto_primario);
                window.matchMedia('(prefers-color-scheme: dark)');
            });
        });
    }

    ionViewDidEnter(){
        if (this.negocio === undefined) {
            this.router.navigate(['/home'], { replaceUrl: true});
        }else{
            this.footer.menu = this.menu;
        }
    }
  
}

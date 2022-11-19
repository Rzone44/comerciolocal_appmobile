import { MenuCategoriasComponent } from 'src/app/componentes/menu-categorias/menu-categorias.component';
import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
    selector: 'app-footer-carrito',
    templateUrl: './footer-carrito.component.html',
    styleUrls: ['./footer-carrito.component.scss'],
})
export class FooterCarritoComponent implements OnInit {
    
    menu: MenuCategoriasComponent;
    @Input() menuId: string
    @Input() negocioActual: string
    categorias: any;
    interval: number;
    TotalProductosEnCarrito: number = 0;
    constructor(
        public router: Router,
        private carrito: CarritoService,
    ) { }

    ngOnInit() { 
        this.actualizarCantidadEnCarrito();
    }
    actualizarCantidadEnCarrito() {
        this.TotalProductosEnCarrito = this.carrito.getCantidadTotal();
    }

    irAInicio(){
        this.router.navigate(['/home', {replaceUrl: true}]);
    }

    irAInicioDeNegocio(negocio){
        this.router.navigate(['/negocio-portada'], { queryParams:{negocio : negocio}});
    }
   
    mostrarCategorias(){
        this.menu.show();
    }

    revisarCarrito() {
        this.router.navigate(['/carrito', {replaceUrl: true}]);
    }

}

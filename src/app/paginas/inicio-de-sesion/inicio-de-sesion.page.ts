import { Router } from '@angular/router';
import { SesionService } from './../../servicios/sesion.service';
import { Component, OnInit } from '@angular/core';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
    selector: 'app-inicio-de-sesion',
    templateUrl: './inicio-de-sesion.page.html',
    styleUrls: ['./inicio-de-sesion.page.scss'],
})
export class InicioDeSesionPage implements OnInit {


    usuario: any = "contacto@comerciolocal.com" ;
    contrasena: any = "Weide4vi";

    constructor(
        private sesion: SesionService,
        private router:Router
    ) { }

    ngOnInit() {
    }

    async IniciarSesion() {
        console.log('Iniciando sesion');
        let SesionIniciada = await this.sesion.IniciarSesion(this.usuario, this.contrasena);
        if (SesionIniciada) {
            this.router.navigate(['/home']);
        } else {
            console.log('//TODO: alertar al usuario por que no se pudo iniciar sesion')
        }
    }

}

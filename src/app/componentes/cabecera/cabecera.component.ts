import { Router } from '@angular/router';
import { SesionService } from './../../servicios/sesion.service';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AppModule } from 'src/app/app.module';

@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
    uri = AppModule.ERP_API_URI;
    constructor(
        public router: Router,
        public sesion: SesionService,
        private location: Location
    ) { }

    @Input() titulo: string = '';

    ngOnInit() {

    }

    irAInicioDeSesion() {
        console.log('redirigir a login');
        this.router.navigate(['/inicio-de-sesion']);
    }

    irAPerfil() {
        console.log('redirigir a login');
        this.router.navigate(['/perfil']);
    }
    regresar() {
        this.location.back();
    }
}

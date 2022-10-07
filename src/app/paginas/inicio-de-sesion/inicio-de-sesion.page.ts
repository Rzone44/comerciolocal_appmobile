import { AlertController } from '@ionic/angular';
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
        private router:Router,
        private alertController: AlertController
    ) { }

    ngOnInit() {
    }

    async IniciarSesion() {
        console.log('Iniciando sesion');
        this.sesion.IniciarSesion(this.usuario, this.contrasena).subscribe({
            next: res=>{
                this.router.navigate(['/home']);
            },
            error: err=>{
                console.log(err);
                this.presentAlert('Sesión','',err.error.message,'ok', ()=>{});
            }
        });
    }

    async presentAlert(_header, _subHeader, _message, _buttonText, handler=undefined) {
        const alert = await this.alertController.create({
          header: _header,
          subHeader: _subHeader,
          message: _message,
          buttons: [{
              text: _buttonText, 
              handler: handler(),
          }]
        });
    
        await alert.present();
      }

}

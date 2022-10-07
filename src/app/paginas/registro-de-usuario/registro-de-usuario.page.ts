import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
    selector: 'app-registro-de-usuario',
    templateUrl: './registro-de-usuario.page.html',
    styleUrls: ['./registro-de-usuario.page.scss'],
})
export class RegistroDeUsuarioPage implements OnInit {

    correo: string                            // = 'no_more1@hotmail.com'
    contrasena: string                        // = 'Weide4vi'    
    comprobar_contrasena: string              // = 'Weide4vi'                
    nombre: string                            // = 'ricardo'
    apellidos: string                         // = 'ramos gonzalez'    
    movil: string                             // = '3335071487'
    constructor(
        private api: ERPApiService,
        private alertController: AlertController,
        private router:Router
    ) { }

    ngOnInit() {
    }

    registroDeUsuario() {
        if (this.contrasena == this.comprobar_contrasena) {
            this.api.insertDoctype('User',{
                "email": this.correo,
                "new_password": this.contrasena,
                "first_name": this.nombre,
                "last_name": this.apellidos,
                "mobile_no": this.movil
            }).subscribe({
                next: arg=> {
                this.presentAlert('Bienvenido','Gracias por registrarte', 'Ya puedes iniciar sesion con tu correo electrónico y contraseña.', 'Iniciar sesion',()=>{
                    this.router.navigate(['inicio-de-sesion']);
                });
                console.log(arg);
            }, error: err =>{
                let MensajeDeError=JSON.parse(JSON.parse(err.error._server_messages)[0]).message
                this.presentAlert('Error','No fue posible realizar el registro', MensajeDeError, 'Regresar al formulario', ()=>{});
                console.log(MensajeDeError);
            }});
            
        }
    }

    async presentAlert(_header, _subHeader, _message, _buttonText, handler) {
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

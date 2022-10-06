import { ERPApiService } from './erpapi.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SesionService {

    activo: boolean = false;
    api_key: string;
    api_secret: string;
    usuario: string;
    contrasena: string;
    nombreDeUsuario: string;
    constructor(
        private api: ERPApiService
    ) { }

    public async IniciarSesion(usuario: string, contrasena: string) {
        console.log('1 Se llama el metodo de inicio de sesion');
        return await this.api.callMethod('login', { "usr": usuario, "pwd": contrasena }).pipe(
            map( async (res: any) => {
                this.activo = true;
                this.nombreDeUsuario = res.full_name;
                this.usuario = usuario;
                this.contrasena = contrasena;
                if (res.message == "Logged In") {
                    console.log('2 Se comprueba si se inicio y se pide el token');
                    let token_res = this.api.callMethod('comercio_local.ws.token', { 'account': usuario }).pipe(
                        map( async (token: any) => {
                        console.log('3 Se recibe el token');
                        this.api_key = token.message.api_key;
                        this.api_secret = token.message.api_secret;
                        return true;
                    })).toPromise();
                    return token_res;
                } else {
                    return false;
                }
            })
        ).toPromise();        
    }
}
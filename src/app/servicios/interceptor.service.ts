import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppModule } from '../app.module';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(
    req:HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>{
      //console.log('Running > Interceptor');
      const esSesionIniciada = localStorage.getItem("SesionIniciada");
      const key = AppModule.ERP_API_CLAVE;
      const secret = AppModule.ERP_API_SECRETO;

      console.log(esSesionIniciada);
      if(esSesionIniciada == null){
        console.log('No se detecto una sesion iniciada, se usara cuenta de solo lectura');
        const headers = req.clone({
          headers: req.headers.set("Authorization", `token ${key}:${secret}`)
          .set("Content-Type","application/json")
          .set("Accept","application/json")
        });
        return next.handle(headers).pipe(
          map((event: HttpEvent<any>)=>{
            if (event instanceof HttpResponse) {
              console.log(event)
            }
            return event;
          }),
          catchError((error: HttpErrorResponse)=>{
            switch (error.status) {
              case 401: 
                console.log('%c'+error.error.message, 'background: #222; color: red'); 
                break;
              case 403: 
                console.log('%c'+error.error._error_message, 'background: #222; color: red');
                break;
              default:
                  console.log('%c Se detecto un error no controlado en el interceptor HTTP.', 'background: #222; color:red');
                  break;
                }
            console.log(error);
            return throwError(error);
          })
        );
      }else{
        console.log('Si se detecto una sesion iniciada, no se modificaran los headers');
        return next.handle(req);
      }
  }
}

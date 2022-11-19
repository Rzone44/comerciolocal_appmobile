import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './servicios/interceptor.service';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ComponentesModule, SwiperModule ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static ERP_API_URI = //"http://192.168.0.31:8183";
                            "http://192.168.247.155:8000";
  public static ERP_API_CLAVE = "6b36fa06281ff9f";
  public static ERP_API_SECRETO = "0738a10d2ea12d4";
/*
    admin 6b36fa06281ff9f:0738a10d2ea12d4
*/
  ngOnInit() {
    console.log('AppModule Start');
  }
}


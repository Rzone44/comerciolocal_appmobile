import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.scss'],
})
export class GaleriaProductoComponent implements OnInit {
    rutaImagenActual : string;
    ERP_API_URI : string = AppModule.ERP_API_URI;
    @Input() producto: any;
    
  constructor() { }

  ngOnInit() {
    this.rutaImagenActual  = this.ERP_API_URI + this.producto.imagen;
  }

  actualizarImagen(ruta){
    this.rutaImagenActual  = this.ERP_API_URI + ruta;
  }
}

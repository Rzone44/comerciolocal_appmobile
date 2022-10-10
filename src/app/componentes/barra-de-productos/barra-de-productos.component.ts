import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { ERPApiService } from 'src/app/servicios/erpapi.service';

@Component({
  selector: 'app-barra-de-productos',
  templateUrl: './barra-de-productos.component.html',
  styleUrls: ['./barra-de-productos.component.scss'],
})
export class BarraDeProductosComponent implements OnInit {

  @Input() nombre_negocio : string;
  negocio={
    barra_de_productos:[],
    color_texto_primario:'#FFF',
    color_fondo_primario:'#CDCDCD'

  };
  conjuntos;
  uri = AppModule.ERP_API_URI;
  ConfiguracionGlobal = JSON.parse(localStorage.getItem("ConfiguracionGeneral"));
  
  constructor(  private api: ERPApiService) { }

  ngOnInit() {
    this.api.getDoctype('CL_Negocio', this.nombre_negocio).subscribe(res =>{
        this.negocio = res;
        this.conjuntos = [];
        //TODO: Mejorar el siguiente codigo con una llamada para obtener una lista a traves de filtros
        this.negocio.barra_de_productos.forEach(barra => {
            this.api.getDoctype('CL_ConjuntoDeProductos',barra.conjunto).subscribe(conjunto =>{
                barra.productos = [];
                conjunto.productos.forEach(p => {
                    this.api.getDoctype('CL_Producto',p.producto).subscribe(producto =>{
                        barra.productos.push(producto);
                        console.log('producto', producto);
                    });
                });
            });
        });
        console.log('negocio-portada',res);
    });
  }

}

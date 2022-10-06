import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
})
export class ModuloComponent implements OnInit {
  ConfiguracionGlobal = undefined;
  uri = AppModule.ERP_API_URI;
  @Input() modulos : any[];
  @Input() imagen : string;
  @Input() titulo : string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.ConfiguracionGlobal = JSON.parse(localStorage.getItem("ConfiguracionGeneral"));
  }

  irAdModulo(ruta){
    this.router.navigate([ruta]);
  }

}

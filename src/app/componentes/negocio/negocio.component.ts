import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Component({
    selector: 'app-negocio',
    templateUrl: './negocio.component.html',
    styleUrls: ['./negocio.component.scss'],
})
export class NegocioComponent implements OnInit {

    ConfiguracionGlobal = JSON.parse(localStorage.getItem("ConfiguracionGeneral"));
    uri = AppModule.ERP_API_URI;
    @Input() negocios : any[];
    @Input() imagen : string;
    @Input() titulo : string;
  
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
      }
    
}

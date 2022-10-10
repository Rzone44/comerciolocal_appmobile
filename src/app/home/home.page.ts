import { Component } from '@angular/core';
import { ERPApiService } from '../servicios/erpapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private api: ERPApiService
  ) {}

  ConfiguracionGlobal = JSON.parse(localStorage.getItem("ConfiguracionGeneral"));
  modulos = [];
  
  ngOnInit() {
   
    this.api.getList('CL_Modulos', '"*"','[["estado","=","Activo"],["modulo_padre","=",""]]').subscribe(res=>{
      this.modulos = res;
    });
  }

}

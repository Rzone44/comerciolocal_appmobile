import { Component } from '@angular/core';
import { ERPApiService } from './servicios/erpapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private api: ERPApiService
  ) {
  }

  ngOnInit() {
    console.log('AppComponent start');
    this.api.callMethod('comercio_local.ws.ComercioLocalGlobalSettings').subscribe(res=>{
      localStorage.setItem("ConfiguracionGeneral", JSON.stringify(res.message));
    })
  }
}

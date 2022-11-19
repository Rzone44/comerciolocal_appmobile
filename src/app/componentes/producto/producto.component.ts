import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

    @Input() producto: any
    uri = AppModule.ERP_API_URI;
  constructor() { }

  ngOnInit() {}

}

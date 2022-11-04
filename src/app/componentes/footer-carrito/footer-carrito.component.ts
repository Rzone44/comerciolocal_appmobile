import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-carrito',
  templateUrl: './footer-carrito.component.html',
  styleUrls: ['./footer-carrito.component.scss'],
})
export class FooterCarritoComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

  revisarCarrito(){
    this.router.navigate(['/carrito']);
  }

}

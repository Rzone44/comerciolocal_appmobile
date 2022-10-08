import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swiper,{ Autoplay, Pagination, Navigation, Lazy } from "swiper";

Swiper.use([Autoplay, Pagination, Navigation, Lazy]);

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideshowComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }

}

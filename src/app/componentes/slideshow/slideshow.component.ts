import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import Swiper,{ Autoplay, Pagination, Navigation, Lazy, EffectFade } from "swiper";
import { SwiperComponent } from 'swiper/angular';


Swiper.use([Autoplay, Pagination, Navigation, Lazy,EffectFade]);

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideshowComponent implements OnInit {
    
    @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
    @Input() slideDeck: Array<{ name: string, imagen: string, titulo: string, enlace: string, html:string, titulo_html:string}> = [];
    @Input() autoPlay: Boolean = true; 

    uri = AppModule.ERP_API_URI;
    interval = undefined;

    constructor() { }
    
    ngOnInit() { 
        this.interval = setInterval(()=>{
            if (this.swiper != undefined) {
                if (this.autoPlay) {
                    this.swiper.swiperRef.autoplay.start();
                    clearInterval(this.interval);
                } else {
                    clearInterval(this.interval);
                }
            }else{
                console.log('Swiper no ha iniciado');
            }
        },500);
    }
    ngAfterViewInit(){
        // if (this.autoPlay) {
        //     this.swiper.swiperRef.autoplay.start();
        // } 
    }
   
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AppModule } from 'src/app/app.module';

@Component({
    selector: 'app-img-slideshow',
    templateUrl: './img-slideshow.component.html',
    styleUrls: ['./img-slideshow.component.scss'],
})
export class ImgSlideshowComponent implements OnInit {

    @ViewChild('slides') ionSlides: IonSlides;
    @Input() slideDeck: Array<{ name: string, imagen: string, titulo: string, enlace: string}> = [];
    @Input() hideControls: Boolean = true; 
    @Input() autoPlay: Boolean = true; 

    public disablePreviousSlideButton = false;
    public disableNextSlideButton = false;
    public displayPlayButton = true;
    public displayStopButton = false;
    public slideConfigAutoplay = {
        initialSlide: 0,
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        allowSlideNext: true,
        allowSlidePrev: true,
        allowTouchMove: true,
        direction: 'horizontal',
        speed: 2500,
        scrollbar: true,
        autoplay: {
            delay: 5000,
          }
      };

      public slideConfig = {
        initialSlide: 0,
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        allowSlideNext: true,
        allowSlidePrev: true,
        allowTouchMove: true,
        direction: 'horizontal',
        speed: 2500,
        scrollbar: true,
      };
      uri = AppModule.ERP_API_URI;
    constructor( 
        private router:Router
        ) { }

    ngOnInit() { 
        console.log(this.slideDeck);
    }

    /**
       * @public
       * @method startAutoplay
       * @description    Uses the Ionic Slides startAutoplay method to trigger the slideshow display.
       *                 We ensure that the play/stop button states are set to the correct value.
       * @returns {none}
       * @memberof HomePage
       */
    public startAutoplay(): void {
        this.ionSlides.startAutoplay();
        this.displayStopButton = true;
        this.displayPlayButton = false;
    }


    /**
     * @public
     * @method stopAutoplay
     * @description    Uses the Ionic Slides stopAutoplay method to stop the automated slideshow display.
     *                 We ensure that the play/stop button states are set to the correct value.
     * @returns {none}
     * @memberof HomePage
     */
    public stopAutoplay(): void {
        this.ionSlides.stopAutoplay();
        this.displayStopButton = false;
        this.displayPlayButton = true;
    }


    /**
     * @public
     * @method runCheckForStateOfSlideshow
     * @description       Determines the beginning/end slides
     * @returns {none}
     * @memberof HomePage
     */
    public runCheckForStateOfSlideshow(): void {
        this.determineSlideState(this.ionSlides,
            this.disablePreviousSlideButton,
            this.disableNextSlideButton);
    }


    /**
     * @public
     * @method runSlideDidReachStart
     * @description       Triggered when the first slide has been reached
     * @returns {none}
     * @memberof HomePage
     */
    public runSlideDidReachStart(): void {
        //console.log('The first slide was reached');
    }


    /**
     * @public
     * @method runSlideDidReachEnd
     * @description       Triggered when the last slide has been reached
     * @returns {none}
     * @memberof HomePage
     */
    public runSlideDidReachEnd(): void {
        //console.log('The last slide was reached');
    }


    /**
     * @public
     * @method runCheckForSlideIndex
     * @description       Retrieves the index of the currently active slide
     * @returns {none}
     * @memberof HomePage
     */
    public runCheckForSlideIndex() {
        this.ionSlides.getActiveIndex().then((val: number) => {
            //console.log('Current slide Index is: ' + val);
        });
    }


    /**
     * @public
     * @method runSlideDrag
     * @param {*} event
     * @description       Triggered when the user drags a slide
     * @returns {none}
     * @memberof HomePage
     */
    public runSlideDrag(event: any): void {
        //console.log('Current event: ' + event.type);
    }


    /**
     * @public
     * @method runSlideTransitionStart
     * @description       Triggered when the slide begins its transition
     * @returns {none}
     * @memberof HomePage
     */
    public runSlideTransitionStart(): void {
        //console.log('Triggered on slide transition start');
    }


    /**
     * @public
     * @method runSlideTransitionEnd
     * @description       Triggered when the slide completes its transition
     * @returns {none}
     * @memberof HomePage
     */
    public runSlideTransitionEnd(): void {
        //console.log('Triggered on slide transition end');
    }

    /**
     * @public
     * @method advanceToNextSlide
     * @description     Advances to the next slide in the collection within the <ion-slides> collection
     * @returns {none}
     * @memberof HomePage
     */
    public advanceToNextSlide(): void {
        this.ionSlides
            .slideNext(500)
            .then((e) => {
                this.determineSlideState(this.ionSlides,
                    this.disablePreviousSlideButton,
                    this.disableNextSlideButton);
            });
    }


    /**
     * @public
     * @method revertToPreviousSlide
     * @description     Advances to the previous slide in the collection within the <ion-slides> collection
     * @returns {none}
     * @memberof HomePage
     */
    public revertToPreviousSlide(): void {
        this.ionSlides
            .slidePrev(500)
            .then(() => {
                this.determineSlideState(this.ionSlides,
                    this.disablePreviousSlideButton,
                    this.disableNextSlideButton);
            });
    }


    /**
     * @public
     * @method determineSlideState
     * @param {IonSlides} ionSlides
     * @param {boolean} disablePreviousSlideButton
     * @param {boolean} disableNextSlideButton
     * @memberof HomePage
     */
    public determineSlideState(ionSlides: IonSlides,
        disablePreviousSlideButton: boolean,
        disableNextSlideButton: boolean): void {
        this.determineIfEndOfSlideshowHasBeenReached(ionSlides, disableNextSlideButton);
        this.determineIfStartOfSlideshowHasBeenReached(ionSlides, disablePreviousSlideButton);
    }


    /**
     * @public
     * @method determineIfEndOfSlideshowHasBeenReached
     * @param {IonSlides} ionSlides
     * @param {boolean} disableNextSlideButton
     * @description   Determines if the <ion-slides> component is currently at the last index of its collection
     *                and disables the next slide button if it is
     * @returns {none}
     * @memberof HomePage
     */
    public determineIfEndOfSlideshowHasBeenReached(ionSlides: IonSlides,
        disableNextSlideButton: boolean): void {
        ionSlides.isEnd().then((val: boolean) => {
            val ? disableNextSlideButton = true : disableNextSlideButton = false;
        });
    }


    /**
     * @public
     * @method determineIfStartOfSlideshowHasBeenReached
     * @param {IonSlides} ionSlides
     * @param {boolean} disablePreviousSlideButton
     * @description   Determines if the <ion-slides> component is currently at the zero index of its array
     *                and disables the previous slide button if it is
     * @returns {none}
     * @memberof HomePage
     */
    public determineIfStartOfSlideshowHasBeenReached(ionSlides: IonSlides, disablePreviousSlideButton: boolean): void {
        ionSlides.isBeginning().then((val: boolean) => {
            val ? disablePreviousSlideButton = true : disablePreviousSlideButton = false;
        });
    }


    /**
     * @public
     * @method slideToSelectedIndex
     * @param {IonSlides} ionSlides
     * @param {string} name
     * @description       Determines the index of the slide that matches the supplied name value and, 
     *                    if a match is found, advances the slideshow to that specific slide
     * @return {none}
     * @memberof HomePage
     */
    public slideToSelectedIndex(event: any): void {
        const name = event.detail.value
        const index = this.slideDeck.findIndex(space => space.name === name);
        this.ionSlides.slideTo((index + 1), 500);
    }

    public redirigir(ruta){
        this.router.navigate([ruta]);
    }

}

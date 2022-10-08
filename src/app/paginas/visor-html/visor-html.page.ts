import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-visor-html',
    templateUrl: './visor-html.page.html',
    styleUrls: ['./visor-html.page.scss'],
})
export class VisorHtmlPage implements OnInit {

    html = ''
    titulo = ''
    constructor(
        private activatedRoute: ActivatedRoute
    ) { }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.html)
                this.html = params.html;
            if (params.titulo)
                this.titulo = params.titulo
          });
    }

}

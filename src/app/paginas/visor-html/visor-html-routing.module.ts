import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisorHtmlPage } from './visor-html.page';

const routes: Routes = [
  {
    path: '',
    component: VisorHtmlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisorHtmlPageRoutingModule {}

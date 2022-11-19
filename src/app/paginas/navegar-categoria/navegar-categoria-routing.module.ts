import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavegarCategoriaPage } from './navegar-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: NavegarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavegarCategoriaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavegarSubmodulosPage } from './navegar-submodulos.page';

const routes: Routes = [
  {
    path: '',
    component: NavegarSubmodulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavegarSubmodulosPageRoutingModule {}

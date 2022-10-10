import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-de-sesion',
    loadChildren: () => import('./paginas/inicio-de-sesion/inicio-de-sesion.module').then( m => m.InicioDeSesionPageModule)
  },
  {
    path: 'registro-de-usuario',
    loadChildren: () => import('./paginas/registro-de-usuario/registro-de-usuario.module').then( m => m.RegistroDeUsuarioPageModule)
  },
  {
    path: 'visor-html',
    loadChildren: () => import('./paginas/visor-html/visor-html.module').then( m => m.VisorHtmlPageModule)
  },
  {
    path: 'navegar-submodulos',
    loadChildren: () => import('./paginas/navegar-submodulos/navegar-submodulos.module').then( m => m.NavegarSubmodulosPageModule)
  },
  {
    path: 'negocio-portada',
    loadChildren: () => import('./paginas/negocio-portada/negocio-portada.module').then( m => m.NegocioPortadaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { RegistrarComponent } from './vistas/registrar/registrar.component';
import { guardLoginGuard } from './Guards/guard-login.guard';
import { ListadoBarcosComponent } from './vistas/barcos/listado-barcos/listado-barcos.component';
import { PerfilComponent } from './vistas/socios/perfil/perfil.component';
import { ListadoComponent } from './vistas/admin/listado/listado.component';
import { AgregarComponent } from './vistas/admin/agregar/agregar.component';
import { AgregarBarcoComponent } from './vistas/barcos/agregar-barco/agregar-barco.component';
import { ListadoPatronesComponent } from './vistas/patrones/listado-patrones/listado-patrones.component';
import { AgregarPatronComponent } from './vistas/patrones/agregar-patron/agregar-patron.component';
import { AgregarSalidaComponent } from './vistas/salida/agregar-salida/agregar-salida.component';
import { ListadoSalidasComponent } from './vistas/salida/listado-salidas/listado-salidas.component';
import { MisBarcosComponent } from './vistas/barcos/mis-barcos/mis-barcos.component';
import { MisSalidasComponent } from './vistas/salida/mis-salidas/mis-salidas.component';
import { SalidaSocioComponent } from './vistas/salida/salida-socio/salida-socio.component';
import { guardAdminGuard } from './Guards/guard-admin.guard';

const routes: Routes = [
  {path:'',component:IniciarSesionComponent},
  {path:'registrar',component:RegistrarComponent},
  {path:'paginaInicio',component:PaginaInicioComponent,canActivate:[guardLoginGuard]},
  {path:'listadoSocios',component:ListadoComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'listadoBarcos',component:ListadoBarcosComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'añadirBarco',component:AgregarBarcoComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'misBarcos',component:MisBarcosComponent,canActivate:[guardLoginGuard]},
  {path:'listadoPatrones',component:ListadoPatronesComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'añadirPatron',component:AgregarPatronComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'añadirSalida',component:AgregarSalidaComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'nuevaSalidaSocio',component:SalidaSocioComponent,canActivate:[guardLoginGuard]},
  {path:'listadoSalida',component:ListadoSalidasComponent,canActivate:[guardLoginGuard,guardAdminGuard]},
  {path:'misSalidas',component:MisSalidasComponent,canActivate:[guardLoginGuard]},
  {path:'perfil',component:PerfilComponent,canActivate:[guardLoginGuard]},
  {path:'agregarAdmin',component:AgregarComponent,canActivate:[guardLoginGuard,guardAdminGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

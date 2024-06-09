import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { MenuComponent } from './core/menu/menu.component';
import { RegistrarComponent } from './vistas/registrar/registrar.component';
import { InterceptorTokenInterceptor } from './Interceptor/interceptor-token.interceptor';
import { SociosComponent } from './vistas/socios/socios.component';
import { BarcosComponent } from './vistas/barcos/barcos.component';
import { ListadoBarcosComponent } from './vistas/barcos/listado-barcos/listado-barcos.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PerfilComponent } from './vistas/socios/perfil/perfil.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { ListadoComponent } from './vistas/admin/listado/listado.component';
import { AgregarComponent } from './vistas/admin/agregar/agregar.component';
import { AgregarBarcoComponent } from './vistas/barcos/agregar-barco/agregar-barco.component';
import { PatronesComponent } from './vistas/patrones/patrones.component';
import { ListadoPatronesComponent } from './vistas/patrones/listado-patrones/listado-patrones.component';
import { AgregarPatronComponent } from './vistas/patrones/agregar-patron/agregar-patron.component';
import { SalidaComponent } from './vistas/salida/salida.component';
import { ListadoSalidasComponent } from './vistas/salida/listado-salidas/listado-salidas.component';
import { AgregarSalidaComponent } from './vistas/salida/agregar-salida/agregar-salida.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MisBarcosComponent } from './vistas/barcos/mis-barcos/mis-barcos.component';
import { MisSalidasComponent } from './vistas/salida/mis-salidas/mis-salidas.component';
import { SalidaSocioComponent } from './vistas/salida/salida-socio/salida-socio.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    PaginaInicioComponent,
    MenuComponent,
    RegistrarComponent,
    SociosComponent,
    BarcosComponent,
    ListadoBarcosComponent,
    PerfilComponent,
    AdminComponent,
    ListadoComponent,
    AgregarComponent,
    AgregarBarcoComponent,
    PatronesComponent,
    ListadoPatronesComponent,
    AgregarPatronComponent,
    SalidaComponent,
    ListadoSalidasComponent,
    AgregarSalidaComponent,
    MisBarcosComponent,
    MisSalidasComponent,
    SalidaSocioComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('token'); // Devuelve el token de autenticación desde el localStorage
        }
      }
    }),
    DialogModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    RippleModule



  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorTokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

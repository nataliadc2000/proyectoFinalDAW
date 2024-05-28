import { Component, OnInit } from '@angular/core';
import { Barcos } from 'src/app/Modelos/Barcos';
import { BarcosService } from 'src/app/Servicios/barcos.service';

@Component({
  selector: 'app-mis-barcos',
  templateUrl: './mis-barcos.component.html',
  styleUrls: ['./mis-barcos.component.css']
})
export class MisBarcosComponent implements OnInit {

  misBarcos: Barcos[] = [];
  emailSocio: string = '';
  titleColor = '#FBC353';
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.4026429373303!2d-5.975671223600512!3d37.38030913478395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e981455141b%3A0xa9d3c79763f02dc8!2sAsociaci%C3%B3n%20de%20Estanqueros%20de%20Sevilla!5e0!3m2!1ses!2ses!4v1706527973620!5m2!1ses!2ses';
  
  constructor(private barcosService: BarcosService) { }
  
  ngOnInit(): void {
    this.obtenerEmailSocio();
    this.obtenerBarcosPorEmail();
  }

  //Metodo para obtener el email del socio que ha iniciado sesion
  obtenerEmailSocio(): void {
    this.emailSocio = sessionStorage.getItem('email')!;
  }
  //Metodo para obtener los barcos del socio que ha iniciado sesion
  obtenerBarcosPorEmail(): void {
    this.barcosService.getBarcosPorEmail(this.emailSocio)
      .subscribe(barcos => {
        this.misBarcos = barcos;
        console.log(barcos);
      });
  }


  
}

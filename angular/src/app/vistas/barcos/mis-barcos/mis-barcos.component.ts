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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  titleColor = '#FBC353';
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.4026429373303!2d-5.975671223600512!3d37.38030913478395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e981455141b%3A0xa9d3c79763f02dc8!2sAsociaci%C3%B3n%20de%20Estanqueros%20de%20Sevilla!5e0!3m2!1ses!2ses!4v1706527973620!5m2!1ses!2ses';
  constructor() { }

  ngOnInit(): void {
  }

}

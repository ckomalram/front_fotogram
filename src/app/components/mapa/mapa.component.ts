import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

// eslint-disable-next-line no-var
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(this.coords);
    const latlng = this.coords.split(',');
    const lat = Number(latlng[0]);
    const lng = Number(latlng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2tvbWFscmFtIiwiYSI6ImNsM2dmc2cyZjAwZXYzZGs0ZjRzYmgxdTEifQ.urGL3g7hJ71B1kYwTHpn8w';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);


  }

}

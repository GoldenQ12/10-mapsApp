import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Marker, Map } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  @Input() lngLat?: [number,number];


  ngAfterViewInit(): void {
    if (!this.lngLat) throw new Error('lnglatCouldnt be found');
    if (!this.divMap?.nativeElement) throw new Error('Map div not found');


    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat ( this.lngLat)
      .addTo(map)
  }

}

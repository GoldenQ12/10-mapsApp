import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"





@Component({
  templateUrl: './fullscreen-page.component.html',
  styleUrl: './fullscreen-page.component.css'
})
export class FullscreenPageComponent implements AfterViewInit{

  @ViewChild('map')
  public divMap?: ElementRef; 

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw ('El elemento no fue encontrado')

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }


}
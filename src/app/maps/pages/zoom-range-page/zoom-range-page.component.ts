import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-75.68224167922966, 40.217893253552916);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw ('El elemento no fue encontrado')

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


  mapListeners():void{

    if ( !this.map ) throw 'Mapa no iniciado';

    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (e => {
      if ( this.map!.getZoom() < 18 ) return ;
      this.map?.zoomTo(18);
    }))

    this.map.on('move', (e) => {
      this.currentLngLat = this.map!.getCenter();
    })

  }

  zoomIn():void{
    this.map?.zoomIn();
  }

  zoomOut():void{
    this.map?.zoomOut();
  }

  zoomChange (zoom: string ):void{
    this.zoom = Number(zoom);
    this.map?.zoomTo ( this.zoom );
  }


}

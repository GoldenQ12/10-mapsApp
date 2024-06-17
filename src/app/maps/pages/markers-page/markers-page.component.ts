import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


interface MarkerAndColor{
  color:string,
  marker:Marker
}

interface PlainMarker{
  color:string,
  lngLat: number[]
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit{

  public currentMarkers: MarkerAndColor[] = [];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-75.68224167922966, 40.217893253552916);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw ('El elemento no fue encontrado')

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML= 'Alexander Salgado';


    const marker = new Marker({
      color:'red'
    }).setLngLat(this.currentLngLat)
    .addTo(this.map)

  }

  createMarker(){
    if ( !this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat: LngLat = this.map.getCenter();

    this.addMarker(lngLat, color);

  }

  addMarker( lgnlat: LngLat, color: string){
    if ( !this.map ) return;

    const marker = new Marker( {
      draggable: true,
      color
    }).setLngLat ( lgnlat)
    .addTo(this.map);

    this.currentMarkers.push({
      color,
      marker,
    });
    this.saveToLocalStorage();

    marker.on('dragend', (e) => {
      this.saveToLocalStorage()
    })
  }

  deleteMarker(index:number):void{
    this.currentMarkers[index].marker.remove();
    this.currentMarkers.splice(index, 1);
  }

  flyTo( marker:Marker ):void {

    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })

  }

  saveToLocalStorage(){

    const plainMarkers: PlainMarker[] = this.currentMarkers.map ( ( { color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));


  }

  readFromLocalStorage(){

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString);

    plainMarkers.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })


  }

}

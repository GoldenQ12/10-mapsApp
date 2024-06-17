import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullscreenPageComponent } from './pages/fullscreen-page/fullscreen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ29sZGVuMjAiLCJhIjoiY2x3OTRtbnd2MmxrYzJycGQ4b3V0OGUyMyJ9.ZlpSvc-Dipq5AVos27YKjw';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullscreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }

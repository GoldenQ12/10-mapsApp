import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from './maps/maps.module';
import { MapsRoutingModule } from './maps/maps-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsRoutingModule,
    MapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

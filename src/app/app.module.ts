import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxCircularPlayerModule } from 'ngx-circular-player';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxCircularPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

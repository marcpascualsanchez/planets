import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HemisLightComponent } from './lights/hemis-light/hemis-light.component';
import { DirLightComponent } from './lights/dir-light/dir-light.component';
import { SkyBoxComponent } from './environment/skybox/skybox.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [HemisLightComponent, DirLightComponent, SkyBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BuilderComponent } from './builder/builder.component';
import { HostDirective } from './host.directive';
import {CreateComponentService} from './create-component.service';


@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    HostDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CreateComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

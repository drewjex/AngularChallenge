import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { MainComponent }          from './main/main.component';
import { CompanyService }          from './company.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  providers: [ CompanyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


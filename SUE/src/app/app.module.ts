import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CompanyDetailPage } from 'src/app/pages/company-detail/company-detail.page';
import { CompanyDetailPageModule } from 'src/app/pages/company-detail/company-detail.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [CompanyDetailPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    CompanyDetailPageModule,
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

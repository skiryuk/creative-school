import 'hammerjs';
import 'mousetrap';
import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {NgxMasonryModule} from 'ngx-masonry';
import {DataService} from './services/data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule.forRoot(),
    ModalGalleryModule.forRoot(),
    NgxPageScrollModule,
    NgxMasonryModule
  ],
  providers: [Title, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

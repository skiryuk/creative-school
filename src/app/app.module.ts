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
import {HttpClientModule} from '@angular/common/http';
import {LoginModalComponent} from './components/modals/login/login.modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {AddPhotoModalComponent} from './components/modals/add-photo/add-photo.modal';
import {AddEventModalComponent} from './components/modals/add-event/add-event.modal';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginModalComponent,
    AddPhotoModalComponent,
    AddEventModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule.forRoot(),
    ModalGalleryModule.forRoot(),
    NgxPageScrollModule,
    NgxMasonryModule
  ],
  providers: [Title, DataService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent,
                    AddPhotoModalComponent,
                    AddEventModalComponent]
})
export class AppModule { }

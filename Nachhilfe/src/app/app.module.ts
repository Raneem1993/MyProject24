import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { StartseiteComponent } from './components/startseite/startseite.component';
import { TableComponent } from './components/table/table.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './register/confirm/confirm.component';
import { RegisterComponent } from './register/register.component';
import { DetailComponent } from './components/detail/detail.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartseiteComponent,
    TableComponent,
    CardsComponent,
    LoginComponent,
    ConfirmComponent,
    RegisterComponent,
    DetailComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    ReactiveFormsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

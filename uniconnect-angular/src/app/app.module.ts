import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavabarComponent } from './layout/navabar/navabar.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './page/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { RegistrazioneComponent } from './page/registrazione/registrazione.component'; // Importa il modulo MatCardModule
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavabarComponent,
    BodyComponent,
    FooterComponent,
    AppLayoutComponent,
    SideBarComponent,
    HomeComponent,
    LoginFormComponent,
    RegistrazioneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    RouterModule,
    MatToolbarModule,MatInputModule,MatTabsModule,
    MatIconModule, MatButtonModule, MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatCardModule,MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

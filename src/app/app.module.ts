import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignInModule } from './components/sign-in/sign-in.module';
import { SignUpModule } from './components/sign-up/sign-up.module';
import { enterAnimation } from './animations/nav-animation';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeModule } from './components/home/home.module';
import { WorkspaceModule } from './components/workspace/workspace.module';
import { ChannelModule } from './components/channel/channel.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    FormsModule,
    CommonModule,
    IonicModule.forRoot({navAnimation:enterAnimation}), 
    AppRoutingModule,
    SignInModule,
    SignUpModule,
    HttpClientModule,
    HomeModule,
    WorkspaceModule,
    RouterModule,
    ChannelModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

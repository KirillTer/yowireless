import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MdButtonModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from "../services/services";
import { HttpModule } from "@angular/http";

import {DataTableModule, MenuModule} from "primeng/primeng";
import {CookieService} from "ngx-cookie-service";
import {AccordionModule} from 'primeng/components/accordion/accordion';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, data: { title: 'login' }},
  {path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' }},
  {path: 'users', component: UsersComponent, data: { title: 'users' }},
  {path: 'settings', component: SettingsComponent, data: { title: 'settings' }},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    SettingsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule,
    FormsModule,
    DataTableModule,
    MenuModule,
    AccordionModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule
  ],
  providers: [
    DataService,
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

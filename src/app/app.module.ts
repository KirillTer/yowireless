import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from "../services/services";
import { HttpModule } from "@angular/http";

import {MenuItem} from 'primeng/components/common/api';
import {DataTableModule} from "primeng/primeng";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, data: { title: 'login' }},
  {path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' }},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule,
    FormsModule,
    DataTableModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

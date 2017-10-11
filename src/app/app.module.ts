import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {NgModule, TemplateRef} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MdButtonModule, MdTableModule, MdInputModule, MdSelectModule, MdCheckboxModule} from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from "../services/services";
import { HttpModule } from "@angular/http";

import {CalendarModule, DataTableModule, MenuModule} from "primeng/primeng";
import {CookieService} from "ngx-cookie-service";
import {AccordionModule} from 'primeng/components/accordion/accordion';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {LogoComponent} from "app/logo/logo.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {Authentication} from "auth/authentication";
import { TextMaskModule } from 'angular2-text-mask';
import { ChangelogComponent } from './changelog/changelog.component';
import { LoginhistoryComponent } from './loginhistory/loginhistory.component';
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, data: { title: 'login' }, canActivate:[Authentication]},
  {path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' }, canActivate:[Authentication]},
  {path: 'users', component: UsersComponent, data: { title: 'users' }, canActivate:[Authentication]},
  {path: 'settings', component: SettingsComponent, data: { title: 'settings' }, canActivate:[Authentication]},
  {path: 'changelog', component: ChangelogComponent, data: { title: 'changelog' }, canActivate:[Authentication]},
  {path: 'loginhistory', component: LoginhistoryComponent, data: { title: 'loginhistory' }, canActivate:[Authentication]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    SettingsComponent,
    UsersComponent,
    SidebarComponent,
    LogoComponent,
    MainMenuComponent,
    ChangelogComponent,
    LoginhistoryComponent
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
    MdTableModule,
    MdInputModule,
    MdSelectModule,
    MdCheckboxModule,
    BrowserAnimationsModule,
    TextMaskModule,
    NgxDatatableModule,
    CalendarModule
  ],
  providers: [
    DataService,
    CookieService,
    Authentication
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

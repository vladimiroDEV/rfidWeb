import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from "app/administration/administration.component";
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdministrationRouterModule } from "app/administration/administration-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AccountModule } from "app/account/account.module";
import { AdmUserComponent } from './adm-user/adm-user.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRouterModule,
    AccountModule,
  ],
  declarations: [
    AdministrationComponent,
    AdminNavComponent,
    AdmUserComponent
  ]
})
export class AdministrationModule { }

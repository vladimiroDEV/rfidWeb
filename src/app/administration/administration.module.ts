import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from "app/administration/administration.component";
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdministrationRouterModule } from "app/administration/administration-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AccountModule } from "app/account/account.module";
import { AdmUserComponent } from './adm-user/adm-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRouterModule,
    AccountModule,
    SharedModule
  ],
  declarations: [
    AdministrationComponent,
    AdminNavComponent,
    AdmUserComponent,
    AllUsersComponent,
    
  ]
})
export class AdministrationModule { }

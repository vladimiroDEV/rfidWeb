import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from "app/administration/administration.component";
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdministrationRouterModule } from "app/administration/administration-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateUserComponent } from './create-user/create-user.component';
import { AccountModule } from "app/account/account.module";

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
    CreateUserComponent
  ]
})
export class AdministrationModule { }

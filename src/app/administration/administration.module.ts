import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from "app/administration/administration.component";
import { AdminNavComponent } from './admin-nav/admin-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdministrationComponent,
    AdminNavComponent
  ]
})
export class AdministrationModule { }

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from "app/account/account.component";
import { ChangePasswordComponent } from "app/account/change-password/change-password.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from "app/account/account.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
   
  ],
  declarations: [
    AccountComponent,
    ChangePasswordComponent
  ],
  providers: [AccountService]
})
export class AccountModule { }

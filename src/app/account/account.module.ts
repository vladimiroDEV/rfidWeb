import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from "app/account/account.component";
import { ChangePasswordComponent } from "app/account/change-password/change-password.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from "app/account/account.service";
import { ProfileComponent } from './profile/profile.component';
import { AccountRoutingModule } from "./account-routing.module";
import { RegistrationFormComponent } from "app/account/registration-form/registration-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule  
  ],
  declarations: [
    AccountComponent,
    ChangePasswordComponent,
    RegistrationFormComponent,
    ProfileComponent
  ],
  providers: [AccountService],
  exports:[RegistrationFormComponent]
})
export class AccountModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManageRfidComponent } from './manage-rfid/manage-rfid.component';
import { RfidFormComponent } from './manage-rfid/rfid-form/rfid-form.component';
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionsComponent } from './manage-rfid/actions/actions.component';
import { ManageRfidService } from './manage-rfid/manage-rfid.service';
import { TotalAmountComponent } from './manage-rfid/total-amount/total-amount.component';
import { ManageUserComponent } from './manage-rfid/manage-user/manage-user.component';
import { UserInfoComponent } from './manage-rfid/user-info/user-info.component';
import { RfidDetailComponent } from './manage-rfid/rfid-detail/rfid-detail.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { EmailValidator } from './directives/email.validator.directive';
import { UserService } from './shared/services/user.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthenticateXHRBackend } from './shared/services/authenticate-xhr.backend';
import { DeviceCodeInputDirective } from './shared/directives/device-code-input.directive';
import { DevicesModule } from "app/manage-rfid/devices/devices.module";
import { DeviceHistoryModule } from "app/manage-rfid/device-history/device-history.module";
import { AdministrationModule } from "app/administration/administration.module";
import { AuthGuard } from "app/shared/services/auth.guards";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { DropdownDirective } from "app/shared/directives/dropdown.directive";
import { AccountModule } from "app/account/account.module";
import { NotificationModule } from "app/shared/notification/notification.module";
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    StatisticsComponent,
    ManageRfidComponent,
    RfidFormComponent,
    PaidComponent,
    HomeComponent,
    ActionsComponent,
    TotalAmountComponent,
    ManageUserComponent,
    UserInfoComponent,
    RfidDetailComponent,
    RegistrationFormComponent,
    EmailValidator, 
    LoginFormComponent, 
    DeviceCodeInputDirective,  
    DropdownDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    SharedModule,
    DevicesModule,
    DeviceHistoryModule,
    AdministrationModule,
    AccountModule,
    NotificationModule
  ],
 providers: [
   ManageRfidService,
   UserService,
   AuthGuard,
   AuthRoleGuard,
   ConfigService,
   
   { 
    provide: XHRBackend, 
    useClass: AuthenticateXHRBackend
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

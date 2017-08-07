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
import { SharedModule } from './shared/modules/shared.module';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { EmailValidator } from './directives/email.validator.directive';
import { UserService } from './shared/services/user.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthenticateXHRBackend } from './shared/services/authenticate-xhr.backend';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './shared/services/notification.service';
import { DeviceCodeInputDirective } from './shared/directives/device-code-input.directive';
import { DevicesModule } from "app/manage-rfid/devices/devices.module";



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
    LoginFormComponent, NotificationComponent, 
    DeviceCodeInputDirective, 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    SharedModule,
    DevicesModule
  ],
 providers: [ManageRfidService,
  UserService,
   ConfigService,
   { 
    provide: XHRBackend, 
    useClass: AuthenticateXHRBackend
  },
  NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

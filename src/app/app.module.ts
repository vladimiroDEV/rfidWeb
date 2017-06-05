import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManageRfidComponent } from './manage-rfid/manage-rfid.component';
import { RfidFormComponent } from './manage-rfid/rfid-form/rfid-form.component';
import { TopUpComponent } from './manage-rfid/top-up/top-up.component';
import { DisableComponent } from './manage-rfid/disable/disable.component';
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { InfoComponent } from './manage-rfid/info/info.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionsComponent } from './manage-rfid/actions/actions.component';
import { ClientFormComponent } from './manage-rfid/rfid-form/client-form/client-form.component';
import { DeviceFormComponent } from './manage-rfid/rfid-form/device-form/device-form.component';
import { ManageRfidFormService } from './manage-rfid/manage-rfid.service';
import { ClaimStep } from './manage-rfid/manage-refid.models';
import { GetRfidComponent } from './manage-rfid/get-rfid/get-rfid.component';
import { ModifyComponent } from './manage-rfid/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    StatisticsComponent,
    ManageRfidComponent,
    RfidFormComponent,
    TopUpComponent,
    DisableComponent,
    PaidComponent,
    InfoComponent,
    HomeComponent,
    ActionsComponent,
    ClientFormComponent,
    DeviceFormComponent,
    GetRfidComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule ,
  ],
 providers: [ManageRfidFormService, ClaimStep ],
  bootstrap: [AppComponent]
})
export class AppModule { }

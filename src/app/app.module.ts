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
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { InfoComponent } from './manage-rfid/info/info.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionsComponent } from './manage-rfid/actions/actions.component';
import { ManageRfidService } from './manage-rfid/manage-rfid.service';
import { GetRfidComponent } from './manage-rfid/get-rfid/get-rfid.component';
import { ModifyComponent } from './manage-rfid/modify/modify.component';
import { TotalAmountComponent } from './manage-rfid/total-amount/total-amount.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    StatisticsComponent,
    ManageRfidComponent,
    RfidFormComponent,
    PaidComponent,
    InfoComponent,
    HomeComponent,
    ActionsComponent,
    GetRfidComponent,
    ModifyComponent,
    TotalAmountComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule ,
  ],
 providers: [ManageRfidService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

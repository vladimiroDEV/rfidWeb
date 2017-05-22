import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRfidComponent } from './manage-rfid/manage-rfid.component';
import { RfidFormComponent } from './manage-rfid/rfid-form/rfid-form.component';
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { TopUpComponent } from './manage-rfid/top-up/top-up.component';
import { DisableComponent } from './manage-rfid/disable/disable.component';
import { InfoComponent } from './manage-rfid/info/info.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'manage-rfid', component: ManageRfidComponent, children: [
    { path: '', component: ManageRfidComponent },
    { path: 'new', component: RfidFormComponent },
    { path: 'paid', component: PaidComponent },
    { path: 'top-up', component: TopUpComponent, },
    { path: 'disable', component: DisableComponent, },
    { path: 'info', component: InfoComponent, },
  ] },
  { path: 'settings', component: SettingsComponent },
  { path: 'statistics', component: StatisticsComponent },
    { path: 'home', component: HomeComponent },
  
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
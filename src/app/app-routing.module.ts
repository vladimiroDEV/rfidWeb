import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRfidComponent } from './manage-rfid/manage-rfid.component';
import { RfidFormComponent } from './manage-rfid/rfid-form/rfid-form.component';
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { InfoComponent } from './manage-rfid/info/info.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { ActionsComponent } from './manage-rfid/actions/actions.component';
import { TotalAmountComponent } from './manage-rfid/total-amount/total-amount.component';
import { ManageUserComponent } from './manage-rfid/manage-user/manage-user.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { NotificationComponent } from './shared/components/notification/notification.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'manage-rfid', component: ManageRfidComponent, children: [
    { path: '', component: ActionsComponent },
    { path: 'new', component: RfidFormComponent },
    { path: 'paid', component: PaidComponent },
    { path: 'info', component: InfoComponent, },
    {path: 'detail/:code', component: TotalAmountComponent},
    {path: 'total', component: TotalAmountComponent},
    {path: 'manage-user', component: ManageUserComponent},
    {path: 'notification', component:NotificationComponent}
  ] },
  { path: 'settings', component: SettingsComponent },
  { path: 'statistics', component: StatisticsComponent },
    { path: 'home', component: HomeComponent },
      { path: 'register', component: RegistrationFormComponent},
    { path: 'login', component: LoginFormComponent}
  
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
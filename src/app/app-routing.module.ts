import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRfidComponent } from './manage-rfid/manage-rfid.component';
import { RfidFormComponent } from './manage-rfid/rfid-form/rfid-form.component';
import { PaidComponent } from './manage-rfid/paid/paid.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { ActionsComponent } from './manage-rfid/actions/actions.component';
import { TotalAmountComponent } from './manage-rfid/total-amount/total-amount.component';
import { ManageUserComponent } from './manage-rfid/manage-user/manage-user.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { DevicesComponent } from "app/manage-rfid/devices/devices.component";
import { DeviceHistoryComponent } from "app/manage-rfid/device-history/device-history.component";
import { AdministrationComponent } from "app/administration/administration.component";
import { AuthGuard } from "app/shared/services/auth.guards";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { AccountComponent } from "app/account/account.component";
import { ChangePasswordComponent } from "app/account/change-password/change-password.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {path:'account', canActivate:[AuthGuard],canActivateChild: [AuthGuard],
  children:[
    {path:'', component: AccountComponent },
    {path:'change-password',component: ChangePasswordComponent}
  ]
  
  },
  { path: 'manage-rfid', canActivate:[AuthGuard], component: ManageRfidComponent, children: [
    { path: '', component: ActionsComponent },
    { path: 'new', component: RfidFormComponent },
    { path: 'paid', component: PaidComponent },
    {path: 'detail/:code', component: TotalAmountComponent},
    {path: 'total', component: TotalAmountComponent},
    {path: 'manage-user', component: ManageUserComponent},
   
    {path: 'devices', component:DevicesComponent},
    {path:'device-history',component:DeviceHistoryComponent}
  
  ] },
  { path:'administration', 
   canActivate: [AuthRoleGuard],
   data: {roles: ['Administrator', 'altro']}, 
   component:AdministrationComponent},

  {path: 'notification/:type/:message', component:NotificationComponent},
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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/shared/services/auth.guards";
import { AccountComponent } from "app/account/account.component";
import { ChangePasswordComponent } from "app/account/change-password/change-password.component";
import { ProfileComponent } from "app/account/profile/profile.component";



const accountRoutes: Routes =[
   {path:'account', canActivate:[AuthGuard],canActivateChild: [AuthGuard], children:[
      {path:'', component: AccountComponent },
      {path:'change-password',component: ChangePasswordComponent},
      {path:'profile',component: ProfileComponent},
  ]
  
  },
]

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports:[RouterModule]
})
export class AccountRoutingModule { }

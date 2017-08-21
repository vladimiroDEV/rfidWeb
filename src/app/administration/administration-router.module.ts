import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { AdministrationComponent } from "app/administration/administration.component";
import { AdmUserComponent } from "app/administration/adm-user/adm-user.component";
import { RegistrationFormComponent } from "app/account/registration-form/registration-form.component";
import { AllUsersComponent } from "app/administration/all-users/all-users.component";
import { AdminMainComponent } from "app/administration/admin-main/admin-main.component";


const routes: Routes = [
   { path:'administration', canActivate: [AuthRoleGuard], data: {roles: ['Administrator', 'altro']}, 
                                       component:AdministrationComponent, children:[
            {path:'', component:AdminMainComponent},
            {path:'users', component: AdmUserComponent,children: [
              {path:'', component:AllUsersComponent},
               {path:'new',component: RegistrationFormComponent},
                {path:':email/edit', component:RegistrationFormComponent},

            ]},
           
           
   ]},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdministrationRouterModule { }

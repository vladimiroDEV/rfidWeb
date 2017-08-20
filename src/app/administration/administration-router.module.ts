import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { AdministrationComponent } from "app/administration/administration.component";
import { AdmUserComponent } from "app/administration/adm-user/adm-user.component";
import { RegistrationFormComponent } from "app/account/registration-form/registration-form.component";


const routes: Routes = [
   { path:'administration', canActivate: [AuthRoleGuard], data: {roles: ['Administrator', 'altro']}, 
                                       component:AdministrationComponent, children:[
            {path:'users', component: AdmUserComponent},
            {path:'users/new',component: RegistrationFormComponent}
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

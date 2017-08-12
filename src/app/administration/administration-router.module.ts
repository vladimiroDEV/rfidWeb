import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { AdministrationComponent } from "app/administration/administration.component";
import { CreateUserComponent } from "app/administration/create-user/create-user.component";


const routes: Routes = [
   { path:'administration', canActivate: [AuthRoleGuard], data: {roles: ['Administrator', 'altro']}, 
   component:AdministrationComponent, children:[
     {path:'create-user', component: CreateUserComponent}
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

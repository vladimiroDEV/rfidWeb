import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";
import { ManageOperatorsComponent } from "app/manage-operators/manage-operators.component";
import { EditOperatorComponent } from "app/manage-operators/edit-operator/edit-operator.component";
import { StoreGuard } from "app/shared/services/store.guard";


const routes: Routes = [
   { path:'manage-operator', 
   component:ManageOperatorsComponent, canActivate:[StoreGuard], children:[
     {path:'new', component: EditOperatorComponent}
   ]},
]

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ManageOperatorRouterModule { }

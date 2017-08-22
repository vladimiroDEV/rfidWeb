import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";
import { ManageOperatorsComponent } from "app/manage-operators/manage-operators.component";
import { EditOperatorComponent } from "app/manage-operators/edit-operator/edit-operator.component";
import { StoreGuard } from "app/shared/services/store.guard";
import { OperatorsMainComponent } from "app/manage-operators/operators-main/operators-main.component";
import { AllOperatorsComponent } from "app/manage-operators/all-operators/all-operators.component";
import { OperatorComponent } from "app/manage-operators/operator/operator.component";


const routes: Routes = [
   { path:'manage-operator', 
   component:ManageOperatorsComponent, canActivate:[StoreGuard], children:[
      {path:'', component: OperatorsMainComponent},
      {path:'operator', component: OperatorComponent, children:[
           {path:'', component: OperatorsMainComponent}, 
          {path:'new', component: EditOperatorComponent},
          {path:':mail/edit', component: EditOperatorComponent},
      ]},
         {path:'operators', component: AllOperatorsComponent}, 
    

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

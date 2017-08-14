import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageOperatorsComponent } from './manage-operators.component';
import { ManageOperatorRouterModule } from "app/manage-operators/manage-operator-router.module";
import { AccountModule } from "app/account/account.module";
import { RequestingService } from "app/shared/services/requesting.service";
import { ManageOperatorsService } from "app/manage-operators/manage-operators.service";
import { EditOperatorComponent } from './edit-operator/edit-operator.component';
import { ReactiveFormsModule } from "@angular/forms";





@NgModule({
  imports: [
    CommonModule,
    ManageOperatorRouterModule,
    AccountModule,
    ReactiveFormsModule
    
  ],
  declarations: [ManageOperatorsComponent, EditOperatorComponent],
  providers:[RequestingService, ManageOperatorsService]
})
export class ManageOperatorsModule { }





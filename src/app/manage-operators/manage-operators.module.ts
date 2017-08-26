import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageOperatorsComponent } from './manage-operators.component';
import { ManageOperatorRouterModule } from "app/manage-operators/manage-operator-router.module";
import { AccountModule } from "app/account/account.module";
import { RequestingService } from "app/shared/services/requesting.service";
import { EditOperatorComponent } from './edit-operator/edit-operator.component';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreGuard } from "app/shared/services/store.guard";
import { OperatorsMainComponent } from './operators-main/operators-main.component';
import { AllOperatorsComponent } from './all-operators/all-operators.component';
import { OperatorComponent } from './operator/operator.component';
import { SharedModule } from "app/shared/shared.module";





@NgModule({
  imports: [
    CommonModule,
    ManageOperatorRouterModule,
    AccountModule,
    ReactiveFormsModule,
    SharedModule,
    
  ],
  declarations: [ManageOperatorsComponent, EditOperatorComponent, OperatorsMainComponent, AllOperatorsComponent, OperatorComponent],
  providers:[RequestingService,  StoreGuard]
})
export class ManageOperatorsModule { }





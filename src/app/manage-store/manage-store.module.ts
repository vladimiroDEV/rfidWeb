import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from './manage-store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ManageStoreRouterModule } from "app/manage-store/manage-store-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreGuard } from "app/shared/services/store.guard";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageStoreRouterModule,
    SharedModule
  ],
  declarations: [ManageStoreComponent, CreateStoreComponent, StoreHomeComponent],
  providers: [ManageStoreService, StoreGuard]
})
export class ManageStoreModule { }

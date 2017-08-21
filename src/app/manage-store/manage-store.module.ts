import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from './manage-store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ManageStoreRouterModule } from "app/manage-store/manage-store-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { StoreHomeComponent } from './store-home/store-home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageStoreRouterModule,
  ],
  declarations: [ManageStoreComponent, CreateStoreComponent, StoreHomeComponent],
  providers: [ManageStoreService]
})
export class ManageStoreModule { }

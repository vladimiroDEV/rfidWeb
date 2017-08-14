import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from './manage-store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ManageStoreService } from './manage-store.service';
import { ManageStoreRouterModule } from "app/manage-store/manage-store-router.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageStoreRouterModule,
  ],
  declarations: [ManageStoreComponent, CreateStoreComponent],
  providers: [ManageStoreService]
})
export class ManageStoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from "app/manage-store/manage-store.component";
import { Routes, RouterModule } from "@angular/router";
import { CreateStoreComponent } from "app/manage-store/create-store/create-store.component";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";
import { StoreHomeComponent } from "app/manage-store/store-home/store-home.component";
import { StoreGuard } from "app/shared/services/store.guard";


const routes: Routes = [
   { path:'manage-store', 
   component:ManageStoreComponent, children:[
     {path:'', component: StoreHomeComponent},
     {path:'create', component: CreateStoreComponent}
   ]},
]

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ManageStoreRouterModule { }

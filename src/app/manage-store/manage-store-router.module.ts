import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from "app/manage-store/manage-store.component";
import { Routes, RouterModule } from "@angular/router";
import { CreateStoreComponent } from "app/manage-store/create-store/create-store.component";

const routes: Routes = [
   { path:'manage-store', 
   component:ManageStoreComponent, children:[
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

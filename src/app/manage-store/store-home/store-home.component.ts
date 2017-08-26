import { Component, OnInit } from '@angular/core';
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { StoreModel } from "app/manage-store/manage-store.models";
import { ApplicationUserVM } from "app/account/account.models";

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent implements OnInit {
store:StoreModel;
operators:ApplicationUserVM[] = [];
  constructor(private _ManageStoreService: ManageStoreService) { }

  ngOnInit() {
    
    this._ManageStoreService.GetStoreDetails()
    .subscribe(res=>{
      this.store = res;
     res.storeUsers.forEach(item=>{
       this.operators.push(item.ApplicationUser)
     }) ;

      console.log(this.store);
      console.log(this.operators);
       console.log(res);
    },
    err=>{
      console.log(err);
    }
  )
  }

}

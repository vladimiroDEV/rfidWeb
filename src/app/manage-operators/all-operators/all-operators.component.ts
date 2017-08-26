import { Component, OnInit } from '@angular/core';
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { ApplicationUserVM } from "app/account/account.models";

@Component({
  selector: 'app-all-operators',
  templateUrl: './all-operators.component.html',
  styleUrls: ['./all-operators.component.css']
})
export class AllOperatorsComponent implements OnInit {

  isRequesting:boolean = false;
  loadingError:boolean = false;
  applicationUsers:ApplicationUserVM[];
  constructor(private _manageStoreService: ManageStoreService) { }

  ngOnInit() {
    this.isRequesting= true;
    this._manageStoreService.GetStoreOperators()
    .finally(()=>this.isRequesting=false)
    .subscribe(res=>{
      this.applicationUsers= res;
      
    },
  err=>{
    this.loadingError= true;
  })
  }

}

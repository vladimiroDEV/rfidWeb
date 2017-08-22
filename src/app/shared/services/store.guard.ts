import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ManageStoreService } from "app/shared/services/manage-store.service";

@Injectable()
export class StoreGuard implements CanActivate{

    constructor(private router:Router,
    private storeService:ManageStoreService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(!localStorage.getItem("store_id")){
            let id = localStorage.getItem("Rfid_AppliactionUserID");

            this.storeService.GetStoreID(id)
            .subscribe(res=>{
                localStorage.setItem("store_id", res.store_id)
                console.log(res)

                return true;
            },err => {
              this.router.navigate(["/manage-store/create"]);
              return false;
            } );
           
            // console.log("canActivate false");

          this.router.navigate(["/manage-store/create"]);
            return false;
        }
        else {
            return true;
        }
    }

}
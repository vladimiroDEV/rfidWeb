import { Injectable } from '@angular/core';
import { BaseService } from "app/shared/services/base.service";
import { Http } from "@angular/http";
import { ConfigService } from "app/shared/utils/config.service";
import { StoreModel } from "app/manage-store/manage-store.models";

@Injectable()
export class ManageStoreService extends BaseService {

  constructor(private http: Http, private configService: ConfigService) {
    super();
  }

  CreateStore(storemodel: StoreModel){
           
           if(localStorage.getItem("Rfid_AppliactionUserID")){
            storemodel.AdministratorID = localStorage.getItem("Rfid_AppliactionUserID");
          
           return this.http.
           post(this.configService.getApiURI()+"/Store/create",
            JSON.stringify(storemodel), 
            this.configService.getRequestOptions())
            .map(res=>res.json());
          }

  }

  GetStoreDetails(){
     return this.http.
           post(this.configService.getApiURI()+"/Store/GetStoreDetails",
            JSON.stringify(this.GetlocalStoreid()), 
            this.configService.getRequestOptions())
            .map(res=>res.json());
  }

  GetStoreOperators(){
     return this.http.
           post(this.configService.getApiURI()+"/Store/GetOperators",
            JSON.stringify(this.GetlocalStoreid()), 
            this.configService.getRequestOptions())
            .map(res=>res.json());
  }

  GetStoreID(email:string){
     return this.http.
           post(this.configService.getApiURI()+"/Store/GetStoreID",
            JSON.stringify(email), 
            this.configService.getRequestOptions())
            .map(res=>res.json());
  }


  HasID() {
    
   if(!localStorage.getItem('store_id')) {
         return  false;
       
      }else { return true}
  }


  SetStoreID(id:string){
    localStorage.setItem("store_id", id);
  }
  GetlocalStoreid(){
    return +localStorage.getItem("store_id");
  }
  GetStoreOperatorID(){
    return localStorage.getItem("Rfid_AppliactionUserID");
  }




}

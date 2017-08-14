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

           return this.http.
           post(this.configService.getApiURI()+"/Store/create",
            JSON.stringify(storemodel), 
            this.configService.getRequestOptions());

  }




}

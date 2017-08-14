import { Injectable } from '@angular/core';
import { BaseService } from "app/shared/services/base.service";
import { ConfigService } from "app/shared/utils/config.service";
import { Http } from "@angular/http";
import { ChangePassword } from "app/account/account.models";



@Injectable()
export class AccountService extends BaseService{

  constructor(private _http: Http, private _conf:ConfigService) {
    super()
   }

  changePassword(changePassword:ChangePassword) {
    
     console.log(JSON.stringify(changePassword));
       return  this._http
           .post(
             this._conf.getApiURI()+'/Accounts/ChangePassword'
             ,JSON.stringify(changePassword)
             ,this._conf.getRequestOptions())
  }


  

}

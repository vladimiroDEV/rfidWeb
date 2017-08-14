import { Injectable } from '@angular/core';
import { BaseService } from "app/shared/services/base.service";
import { Http, RequestOptions } from "@angular/http";
import { ConfigService } from "app/shared/utils/config.service";
import { UserRegistration } from "app/shared/models/user.registration.interface";
import { ChangePassword } from "app/account/account.models";

@Injectable()
export class RequestingService extends BaseService {

   _baseUrl:string;
   _options:RequestOptions;

  constructor( private _http:Http, private _config: ConfigService) {
    super();
    this._baseUrl = this._config.getApiURI();
    this._options = this._config.getRequestOptions();
  }


// #Region MANAGE OPERATORS **
  // solo AdminStore
  createOperator(userRegistration:UserRegistration){
    this._http.post(
      this._baseUrl+'/store/createoperator',
      JSON.stringify(userRegistration),
      this._options
    )
  }

    // #endREGION MANAGE OPERATORS
  changePassword(changePassword:ChangePassword) {
    
     console.log(JSON.stringify(changePassword));
       return  this._http
           .post(
             this._baseUrl+'/Accounts/ChangePassword'
             ,JSON.stringify(changePassword)
             ,this._options)
  }







}

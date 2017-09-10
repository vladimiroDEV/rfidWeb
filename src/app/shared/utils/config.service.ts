import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
       //this._apiURI = 'http://localhost:5000/api';
      this._apiURI ='http://rfiddeviceapi.azurewebsites.net/api';
     }
 
     getApiURI() {
         return this._apiURI;
     }    

      getRequestOptions():RequestOptions {
 
          let _headers = new Headers({ 'Content-Type': 'application/json' });  // old Accept 

          if (localStorage.getItem('auth_token')) {
              let authToken = localStorage.getItem('auth_token');
              _headers.append('Authorization', `Bearer ${authToken}`);
          }
          let options = new RequestOptions({ headers: _headers });
          return options;
    }
    getApplicationUserID():string {

        if(localStorage.getItem('Rfid_AppliactionUserID')){
            return localStorage.getItem('Rfid_AppliactionUserID');
        }
        return "";
    }
}
 
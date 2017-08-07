import { Injectable } from '@angular/core';
import { Anagrafica, RfidDevice, PaidModel, RfidDeviceTransaction, AnagraficaRfidDeviceModel } from './manage-refid.models';

import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services/base.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { ConfigService } from '../shared/utils/config.service';


@Injectable()
export class ManageRfidService extends BaseService {

  baseUrl: string = '';
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
    rfid: RfidDevice
  _options:RequestOptions;
  _applicationUserId= "";
 
    constructor(private _http: Http, configService: ConfigService) {

          super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
     this._options= configService.getRequestOptions();
     this._applicationUserId = configService.getApplicationUserID();
    }
  

//http

    createRfid(anagraficaRfidDeviceModel: AnagraficaRfidDeviceModel) {
       
       anagraficaRfidDeviceModel.device.ApplicationUserID = this._applicationUserId;
       
        return this._http.post(this.baseUrl+"/RfidDevice/create", JSON.stringify(anagraficaRfidDeviceModel), this._options)
    }
    getRfidByCode() {

        return this._http.get(this.baseUrl +'/RfidDevice/code/'+ this.rfid.RfidDeviceCode, this._options)

    }
    paidAction(paidModel: PaidModel) { 
       
        return this._http.post(this.baseUrl +'/RfidDevice/paid', JSON.stringify(paidModel), this._options);
    }

    getAllTransactionsToPaydOff(rfidCode: string){
        
      return this._http.get(this.baseUrl +'/RfidDevice/getAllTransactionsToPaydOff/'+ rfidCode,this._options);
    }

    getUserDetailByEmail(email:string) {
        return this._http.get(this.baseUrl+ '/RfidDevice/userdetailbymail/'+ email, this._options);
    }
     getUserDetailByRfidCode(code:string) {
        return this._http.get(this.baseUrl+ '/RfidDevice/userdetailbyrfidcode/'+ code, this._options);
    }
   
  
     // esetRfid : dissassOcia il disposistivo dall'utente
      paidTotalReset(code:string){
          
         return this._http.post(this.baseUrl+ '/RfidDevice/paidTotalReset', JSON.stringify(code), this._options);
        
    }
    

    // paga il totale 
    // 
    totalPaid(email:string){
      return this._http.post(this.baseUrl+ '/paidTotal/'+ email, this._options);
    }

    // get mail likes 

    getMailLikes(email:string) {
         return this._http.get(this.baseUrl+'/Anagrafica/emailLikes/'+ email, this._options );
    }


    getDevicesByApplicationUser() {
         return this._http.get(this.baseUrl+'/RfidDevice/GetByApplicationUser/',this._options );
    }


}
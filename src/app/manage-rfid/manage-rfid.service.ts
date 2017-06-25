import { Injectable } from '@angular/core';
import { Anagrafica, Rfid, PaidModel, Transaction } from './manage-refid.models';

import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class ManageRfidService {
    rfid: Rfid
     _headers = new Headers({ 'Content-Type': 'application/json' });
    _options = new RequestOptions({ headers: this._headers });
  

    private _url = "http://localhost:51279/api/rfid";

    constructor(private _http: Http) {
      
    }
  

//http

    createRfid(rfid: Rfid) {

        return this._http.post(this._url+"/create", JSON.stringify(rfid), this._options)
    }
    getRfidByCode() {
        // let _headers = new Headers({ 'Content-Type': 'application/json' });
        // let _options = new RequestOptions({ headers: _headers });
        return this._http.get(this._url +'/code/'+ this.rfid.RfidCode, this._options)

    }
    paidAction(paidModel: PaidModel) { 
        return this._http.post(this._url +'/paid', JSON.stringify(paidModel), this._options);
    }

    getAllTransactionRfid(rfidCode: string){
      return this._http.get(this._url +'/transactionsToConfirmRfidCode/'+ rfidCode,this._options);
    }

    getUserDetailByEmail(email:string) {
        return this._http.get(this._url+ '/userdetailbymail/'+ email, this._options);
    }
     getUserDetailByRfidCode(code:string) {
        return this._http.get(this._url+ '/userdetailbyrfidcode/'+ code, this._options);
    }
   
  
     // esetRfid : dissassicia il disposistivo dall'utente
      paidTotalReset(code:string, leaveRfid? :boolean){
         return this._http.post(this._url+ '/paidTotalReset/'+ code, this._options);
        

    }


}
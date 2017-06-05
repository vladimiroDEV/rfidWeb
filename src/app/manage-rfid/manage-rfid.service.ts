import { Injectable } from '@angular/core';
import { Anagrafica, Rfid, } from './manage-refid.models';

import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class ManageRfidService {
    rfid: Rfid
  

    private _url = "http://localhost:51279/api/rfid";

    constructor(private _http: Http) {
        // this.rfid = new Rfid();
        // this.rfid.Anagrafica = new Anagrafica();

    }
    destroy() {
    //   this.rfid.Anagrafica = new Anagrafica();
    //     this.rfid = new Rfid();
    }


    getRfid(): Rfid { return this.rfid }


//http

    createRfid(rfid: Rfid) {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let _options = new RequestOptions({ headers: _headers });
        return this._http.post(this._url, JSON.stringify(rfid), _options)
              .subscribe(res => console.log(res.json()))
    }
    getRfidByCode() {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let _options = new RequestOptions({ headers: _headers });
        return this._http.get(this._url +'/code/'+ this.rfid.RfidCode, _options)

    }
    paidAction(rfid: Rfid) {
         let _headers = new Headers({ 'Content-Type': 'application/json' });
        let _options = new RequestOptions({ headers: _headers });
        return this._http.put(this._url +'/paid/'+ this.rfid.RfidCode, JSON.stringify(rfid), _options);
        //.subscribe(res => console.log("OK"))
    }


}
import { Injectable } from '@angular/core';
import { Anagrafica, Rfid, ClaimStep, ManageRfidFormModel } from './manage-refid.models';

import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class ManageRfidFormService {
    anagrafica: Anagrafica;
    rfid: Rfid
    claimStep: ClaimStep;

    private _url = "http://localhost:51279/api/rfid";

    constructor(private _http: Http) {
     //   this.anagrafica = new Anagrafica();
        this.rfid = new Rfid();
        this.rfid.Anagrafica = new Anagrafica();
        this.claimStep = new ClaimStep()

    }
    destroy() {
      //   this.anagrafica = new Anagrafica();
        this.rfid = new Rfid();
        this.claimStep = new ClaimStep()
    }

    nextStep(): number {
        return this.claimStep.addStep();
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
        return this._http.post(this._url +'/paid/'+ this.rfid.RfidCode, JSON.stringify(rfid), _options)
        .subscribe(res => console.log(res.json()))
    }


}
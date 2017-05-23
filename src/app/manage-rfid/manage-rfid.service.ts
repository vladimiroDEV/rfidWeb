import { Injectable } from '@angular/core';
import { Anagrafica, Rfid, AnagraficaRfid, ClaimStep, ManageRfidFormModel } from './manage-refid.models';

import { Headers, RequestOptions, Http } from '@angular/http';


@Injectable()
export class ManageRfidFormService {
    anagrafica: Anagrafica;
    rfid: Rfid;
    anagraficaRfid: AnagraficaRfid;
    claimStep: ClaimStep;

    private _url = "http://localhost:28543/api/rfid";





    constructor(private _http: Http) {
        this.anagrafica = new Anagrafica();
        this.rfid = new Rfid();
        this.anagraficaRfid = new AnagraficaRfid();
        this.claimStep = new ClaimStep()

    }
    destroy() {
         this.anagrafica = new Anagrafica();
        this.rfid = new Rfid();
        this.anagraficaRfid = new AnagraficaRfid();
        this.claimStep = new ClaimStep()
    }

    nextStep(): number {
        return this.claimStep.addStep();
    }

    getAnagrafica(): Anagrafica { return this.anagrafica }
    getRfid(): Rfid { return this.rfid }
    getAnagraficaRfid(): AnagraficaRfid { return this.anagraficaRfid }

    getManageRfidFormModel() {
        return new ManageRfidFormModel(this.getRfid(), this.getAnagrafica(), this.getAnagraficaRfid());
    }
    setRefidModel(){
        
    }



    createRfid(rfidFormmodel: ManageRfidFormModel) {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let _options = new RequestOptions({ headers: _headers });
        return this._http.post(this._url, JSON.stringify(rfidFormmodel), _options)
            .subscribe(res => console.log(res.json()))
    }
    getRfidByCode() {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let _options = new RequestOptions({ headers: _headers });
        return this._http.get(this._url +'/code/'+ this.rfid.RfidCode, _options).subscribe(res=>res => console.log( " get Call " + res.json()) );

    }


}
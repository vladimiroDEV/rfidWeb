
import { Injectable } from '@angular/core';


export class Anagrafica {
    AnagraficaID?: number;
    Email: string;
    Nome: string;
    Cognome: string;
    Telefono: number;
    CreationDate:Date;


}
export class Rfid {
 public   RfidID?: number;
  public  RfidCode: string;
    ExpirationDate: Date;
    CreationDate: Date;
    LastModifiedDate:Date;
 public   Credit:number;
    AppUserID:number;
    Active: boolean;
    AnagraficaID?: number;
    Anagrafica?:Anagrafica;


}

export class ManageRfidFormModel {
  constructor(private rfid:Rfid, private anagrafica:Anagrafica){
      this.rfid.Anagrafica = this.anagrafica;
  }
}


@Injectable()
export class ClaimStep {
    currentStep: number;
    constructor() {
        this.currentStep = 1;
    }
    addStep(): number {
        return this.currentStep++;

    }


    subtractStep() {
        this.currentStep = this.currentStep - 1;
        return this.currentStep;
    }
}
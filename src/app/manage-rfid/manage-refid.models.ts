
import { Injectable } from '@angular/core';


export class Anagrafica {
    IdAnagrafica?: number;
    Email: string;
    Nome: string;
    Cognome: string;
    Telefono: number;

}
export class Rfid {
    IdRfid?: number;
    RfidCode: string;
    ExpirationDate: Date;
    CreationDate: Date;
    Active: boolean;
    UserId: number;
}
export class AnagraficaRfid {
    Credit: number;
    IsValid: boolean;
    ExpiryDate: Date;
}

export class ManageRfidFormModel {
  constructor(private rfid:Rfid, private anagrafica: Anagrafica, private AnagRfid: AnagraficaRfid){}
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
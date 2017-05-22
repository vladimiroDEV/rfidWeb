import { Injectable }     from '@angular/core';
import { Anagrafica, Rfid, AnagraficaRfid, ClaimStep } from './manage-refid.models';


@Injectable() 
export class ManageRfidFormService {
    anagrafica:Anagrafica;
    rfid:Rfid;
    anagraficaRfid: AnagraficaRfid;
    claimStep:ClaimStep;
    constructor() {
        this.anagrafica = new Anagrafica();
        this.rfid = new Rfid();
        this.anagraficaRfid = new AnagraficaRfid();
        this.claimStep = new ClaimStep();

    }

   nextStep(): number {
      return this.claimStep.addStep();
  }
  getAnagrafica ():Anagrafica {return this.anagrafica}
  getRfid ():Rfid {return this.rfid}
  getAnagraficaRfid ():AnagraficaRfid {return this.anagraficaRfid}

 
    
}
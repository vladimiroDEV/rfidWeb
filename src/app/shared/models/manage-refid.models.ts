
import { Injectable } from '@angular/core';


export class Anagrafica {
    AnagraficaID?: number;
    Email: string;
    Nome: string;
    Cognome: string;
    Telefono: number;
    CreationDate:Date;
    LastModifiedDate?:Date;


}
export class RfidDevice {
  RfidDeviceID?: number;
   RfidDeviceCode: string;
    ExpirationDate: Date;
    CreationDate: Date;
    LastModifiedDate:Date;
  Credit:number;
    ApplicationUserID:string;
    Active: boolean;
    AnagraficaID?: number;
}

export class PaidModel {  
    RfidCode:string;
    Price:number;
    Descrizione:string;
}

export class RfidDeviceTransaction
 {
    
    RfidDeviceTransactionID:number;
   RfidDeviceCode:string;
    TransactionOperation:string;
    TransactionDate: Date;
    Importo: number;
    Descrizione: string;

}
export class UserDetailViewModel {
    Anagrafica: Anagrafica;
    Dispositivi: RfidDevice[];
}

export class AnagraficaRfidDeviceModel {
     anagrafica: Anagrafica;
     device: RfidDevice;
}






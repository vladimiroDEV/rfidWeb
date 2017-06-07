
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
  RfidID?: number;
   RfidCode: string;
    ExpirationDate: Date;
    CreationDate: Date;
    LastModifiedDate:Date;
  Credit:number;
    AppUserID:number;
    Active: boolean;
    AnagraficaID?: number;
    Anagrafica?:Anagrafica;

}

export class PaidModel {  
    RfidCode:string;
    Price:number;
    Descrizione:string;
}

export class Transaction {
    Operation:string;
    TransactionDate: Date;
    Importo: number;
    Descrizione: string;

}





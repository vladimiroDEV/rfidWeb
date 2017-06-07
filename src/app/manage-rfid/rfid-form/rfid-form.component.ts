import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { Rfid, Anagrafica } from '../manage-refid.models';


@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css']
})
export class RfidFormComponent implements OnInit {

RfidForm:FormGroup;

_rfid:Rfid;

  ngOnInit() {
     this.RfidForm = this.fb.group({
      'email':new FormControl(this._rfid.Anagrafica.Email),
      'nome': new FormControl(this._rfid.Anagrafica.Nome), 
      'cognome': new FormControl(this._rfid.Anagrafica.Cognome),
      'telefono':new FormControl(this._rfid.Anagrafica.Telefono),
      'rfidCode': new FormControl(this._rfid.RfidCode)
    });
  } 

constructor(
  private fb:FormBuilder,
  private manageRfidFormService:ManageRfidService
)
{
  this._rfid = new Rfid();
  this._rfid.Anagrafica = new Anagrafica()
}



 submit() {
        
       this._rfid.Anagrafica.Email = this.RfidForm.value.email;
        this._rfid.Anagrafica.Nome = this.RfidForm.value.nome;
       this._rfid.Anagrafica.Cognome = this.RfidForm.value.cognome;
        this._rfid.Anagrafica.Telefono = this.RfidForm.value.telefono;
        this._rfid.RfidCode = this.RfidForm.value.rfidCode;
        this._rfid.AppUserID = 1;
        this._rfid.Credit = 0;
        this._rfid.Active = true;

       this.manageRfidFormService.createRfid(this._rfid);

 }
}

import { Component, OnInit, Input } from '@angular/core';
import { ClaimStep, Rfid } from '../../manage-refid.models';
import { ManageRfidFormService } from '../../manage-rfid.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  
})
export class ClientFormComponent implements OnInit {

@Input() onNext;

_refid : Rfid;
DatiClienteForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder
  )
   { 
    this._refid = manageRfidFormService.getRfid();
   }

  ngOnInit() {
     this.DatiClienteForm = this.fb.group({
      'email':new FormControl(this.manageRfidFormService.rfid.Anagrafica.Email),
      'nome': new FormControl(this.manageRfidFormService.rfid.Anagrafica.Nome), 
      'cognome': new FormControl(this.manageRfidFormService.rfid.Anagrafica.Cognome),
      'telefono':new FormControl(this.manageRfidFormService.rfid.Anagrafica.Telefono)
    });
  }

    submit() {
      console.log(this.DatiClienteForm);
      console.log("service : "+ this.manageRfidFormService.rfid)

        this.manageRfidFormService.rfid.Anagrafica.Email = this.DatiClienteForm.value.email;
        this.manageRfidFormService.rfid.Anagrafica.Nome = this.DatiClienteForm.value.nome;
       this.manageRfidFormService.rfid.Anagrafica.Cognome = this.DatiClienteForm.value.cognome;
        this.manageRfidFormService.rfid.Anagrafica.Telefono = this.DatiClienteForm.value.telefono;
        
        this.onNext();
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { Anagrafica, ClaimStep } from '../../manage-refid.models';
import { ManageRfidFormService } from '../../manage-rfid.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  
})
export class ClientFormComponent implements OnInit {

@Input() onNext;

anagrafica:Anagrafica;
DatiClienteForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder
  )
   { 
     this.anagrafica = manageRfidFormService.getAnagrafica();
   }

  ngOnInit() {
     this.DatiClienteForm = this.fb.group({
      'email':new FormControl(this.manageRfidFormService.anagrafica.Email),
      'nome': new FormControl(this.manageRfidFormService.anagrafica.Nome),
      'cognome': new FormControl(this.manageRfidFormService.anagrafica.Cognome),
      'telefono': new FormControl(this.manageRfidFormService.anagrafica.Telefono)
    });
  }

    submit() {

        this.anagrafica.Email = this.DatiClienteForm.value.email;
        this.anagrafica.Nome = this.DatiClienteForm.value.nome;
        this.anagrafica.Cognome = this.DatiClienteForm.value.cognome;
        this.anagrafica.Telefono = this.DatiClienteForm.value.telefono;
        this.onNext();
    }

}

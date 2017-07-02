import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { Rfid, Anagrafica } from '../manage-refid.models';

import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css']
})
export class RfidFormComponent implements OnInit {

  RfidForm: FormGroup;

  _rfid: Rfid;
  _tipsMail :string[];
  esitoSalvataggioView = false;
  allertErrorView = false;
  allertErrorMessage = '';
  formView = true;

  ngOnInit() {
   
   this.initForm();

   
      this.RfidForm.controls['email'].valueChanges
      .debounceTime(400)
      .subscribe(mail=>{
        console.log(mail);
        this.manageRfidFormService.getMailLikes(mail)
        .subscribe(data=>{
          //console.log(data);

          this._tipsMail = data.json();
        },
        err=> {this._tipsMail = []});
        });
 
  }

  initForm() {
 this.RfidForm = this.fb.group({
      'email': new FormControl(this._rfid.Anagrafica.Email),
      'nome': new FormControl(this._rfid.Anagrafica.Nome),
      'cognome': new FormControl(this._rfid.Anagrafica.Cognome),
      'telefono': new FormControl(this._rfid.Anagrafica.Telefono),
      'rfidCode': new FormControl(this._rfid.RfidCode)
    });
  }

  constructor(
    private fb: FormBuilder,
    private manageRfidFormService: ManageRfidService
  ) {
    this._rfid = new Rfid();
    this._rfid.Anagrafica = new Anagrafica()
  }

  back() {
    this.allertErrorView = false;;
    this.formView = true;
    this.allertErrorMessage = '';
    this.esitoSalvataggioView = false;
  }

  clearForm() {

  }

  loadByEmail(mail:string) {
    this.manageRfidFormService.getUserDetailByEmail(mail)
    .subscribe(data => {
      this._rfid.Anagrafica = data.json().Anagrafica;

    this.initForm();
      console.log(data.json().Anagrafica);
      this._tipsMail = [];
    })
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

    this.manageRfidFormService.createRfid(this._rfid).subscribe(res => {
      this.esitoSalvataggioView = true;
      this.formView = false;
    },
      err => {
        this.allertErrorView = true;
        this.formView = false;
        this.allertErrorMessage = 'errori durante il salvataggio';

      });

  }
}

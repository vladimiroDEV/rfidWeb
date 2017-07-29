import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, Anagrafica, AnagraficaRfidDeviceModel } from '../manage-refid.models';

import 'rxjs/add/operator/debounceTime';
import { ConfigService } from '../../shared/utils/config.service';


@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css']
})
export class RfidFormComponent implements OnInit {

  RfidForm: FormGroup;

  _rfid: RfidDevice
  _anagrafica: Anagrafica;
 _anagraficaRfidDeviceModel: AnagraficaRfidDeviceModel;
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
      'email': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Email),
      'nome': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Nome),
      'cognome': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Cognome),
      'telefono': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Telefono),
      'rfidCode': new FormControl(this._anagraficaRfidDeviceModel.rfidDevice.RfidDeviceCode)
    });
  }

  constructor(
    private fb: FormBuilder,
    private manageRfidFormService: ManageRfidService,
    private _configServices: ConfigService
  ) {
    this._rfid = new RfidDevice();
    this._anagrafica= new Anagrafica();
    this._anagraficaRfidDeviceModel = new AnagraficaRfidDeviceModel();
    
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
      this._anagrafica = data.json().Anagrafica;

    this.initForm();
      console.log(data.json().Anagrafica);
      this._tipsMail = [];
    })
  }



  submit() {

    this._anagraficaRfidDeviceModel.anagrafica.Email = this.RfidForm.value.email;
    this._anagraficaRfidDeviceModel.anagrafica.Nome = this.RfidForm.value.nome;
    this._anagraficaRfidDeviceModel.anagrafica.Cognome = this.RfidForm.value.cognome;
    this._anagraficaRfidDeviceModel.anagrafica.Telefono = this.RfidForm.value.telefono;
    this._anagraficaRfidDeviceModel.rfidDevice.RfidDeviceCode = this.RfidForm.value.rfidCode;
    this._anagraficaRfidDeviceModel.rfidDevice.ApplicationUserID = this._configServices.getApplicationUserID();
    this._anagraficaRfidDeviceModel.rfidDevice.Credit = 0;
    this._anagraficaRfidDeviceModel.rfidDevice.Active = true;

    this.manageRfidFormService.createRfid(this._anagraficaRfidDeviceModel).subscribe(res => {
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

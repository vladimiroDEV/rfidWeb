import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, Anagrafica, AnagraficaRfidDeviceModel } from '../manage-refid.models';

import 'rxjs/add/operator/debounceTime';
import { ConfigService } from '../../shared/utils/config.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { NotificationType } from '../../shared/models/SharedModels';


@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css'],
 
})
export class RfidFormComponent implements OnInit {

  RfidForm: FormGroup;

 _anagraficaRfidDeviceModel: AnagraficaRfidDeviceModel;
  _tipsMail :string[];
  formView = true;
  _enableDeviceInput = true;
 

  _notificationMessage = "";
  _notificationType= NotificationType.info;

constructor(
    private fb: FormBuilder,
    private manageRfidFormService: ManageRfidService,
    private _configServices: ConfigService,
    private _elemRef: ElementRef, 
    

  ) {

     this._anagraficaRfidDeviceModel = new AnagraficaRfidDeviceModel();
     this._anagraficaRfidDeviceModel.anagrafica = new Anagrafica();
     this._anagraficaRfidDeviceModel.device = new RfidDevice();
  }

  

  ngOnInit() {
   
   this.initForm();
   this.watchEmilField()
  }

  initForm() {
 this.RfidForm = this.fb.group({
      'email': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Email),
      'nome': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Nome),
      'cognome': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Cognome),
      'telefono': new FormControl(this._anagraficaRfidDeviceModel.anagrafica.Telefono),
      'rfidCode': new FormControl(this._anagraficaRfidDeviceModel.device.RfidDeviceCode),
    });

    
  }

  loadByEmail(mail:string) {
    this._anagraficaRfidDeviceModel.anagrafica= new Anagrafica();
    this._anagraficaRfidDeviceModel.device = new  RfidDevice();
    this.manageRfidFormService.getUserDetailByEmail(mail)
        .subscribe(data => {
    this._anagraficaRfidDeviceModel.anagrafica = data.json().Anagrafica;
    this.initForm();
    this._tipsMail = [];
    this.watchEmilField();
    })
  }

  submit() {

    this._anagraficaRfidDeviceModel.anagrafica.Email = this.RfidForm.value.email;
    this._anagraficaRfidDeviceModel.anagrafica.Nome = this.RfidForm.value.nome;
    this._anagraficaRfidDeviceModel.anagrafica.Cognome = this.RfidForm.value.cognome;
    this._anagraficaRfidDeviceModel.anagrafica.Telefono = this.RfidForm.value.telefono;
    this._anagraficaRfidDeviceModel.device.RfidDeviceCode = this.RfidForm.value.rfidCode;
    this._anagraficaRfidDeviceModel.device.ApplicationUserID = this._configServices.getApplicationUserID();
    this._anagraficaRfidDeviceModel.device.Credit = 0;
    this._anagraficaRfidDeviceModel.device.Active = true;

    this.manageRfidFormService.createRfid(this._anagraficaRfidDeviceModel).subscribe(res => {
        this._notificationMessage = "Operazione e termita con successo !!!";
        this._notificationType = NotificationType.success;
        this.formView = false;
    },
      err => {
        this._notificationMessage = "Errori durante il salvataggio !!!";
        this._notificationType = NotificationType.danger;
        this.formView = false;
      });
  }

  clearForm() {

 this.ngOnInit();

    this._anagraficaRfidDeviceModel.anagrafica = new Anagrafica();
    this._anagraficaRfidDeviceModel.device = new RfidDevice();
     this.initForm();

  }

   watchEmilField(){
        this.RfidForm.controls['email'].valueChanges
      .debounceTime(400)
      .subscribe(mail=>{
        this.manageRfidFormService.getMailLikes(mail)
        .subscribe(data=>{
          this._tipsMail = data.json();
        },
        err=> {this._tipsMail = [];  console.log(err);});
      }); 
      this.RfidForm.controls['rfidCode'].valueChanges
      .subscribe(data=>{
        console.log(data);
      })
     }

    

     
}

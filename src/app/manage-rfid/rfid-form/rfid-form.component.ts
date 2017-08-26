import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, Anagrafica, AnagraficaRfidDeviceModel } from "app/shared/models/manage-refid.models";

import 'rxjs/add/operator/debounceTime';
import { ConfigService } from '../../shared/utils/config.service';
import { Router } from '@angular/router';
import { NotificationType } from '../../shared/models/SharedModels';
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { NotificationService } from "app/shared/notification/notification.service";


@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css'],
 
})
export class RfidFormComponent implements OnInit {

  RfidForm: FormGroup;
  _rfidDevice :RfidDevice;

  _tipsMail :string[];


  _notificationMessage = "";
  _notificationType= NotificationType.info;

constructor(
    private fb: FormBuilder,
    private manageRfidFormService: ManageRfidService,
    private manageStoreService:ManageStoreService,
    private _configServices: ConfigService,
    private _elemRef: ElementRef, 
    private _notificationservice: NotificationService
    

  ) {
    this._rfidDevice = new RfidDevice();
    this._rfidDevice.Anagrafica = new Anagrafica();

  }

  

  ngOnInit() {
   
   this.initForm();
   this.watchEmilField()
  }

  initForm() {
 this.RfidForm = this.fb.group({
      'email': new FormControl(this._rfidDevice.Anagrafica.Email ),
      'nome': new FormControl(this._rfidDevice.Anagrafica.Nome),
      'cognome': new FormControl(this._rfidDevice.Anagrafica.Cognome),
      'telefono': new FormControl(this._rfidDevice.Anagrafica.Telefono),
      'rfidCode': new FormControl(this._rfidDevice.RfidDeviceCode),
    });

    
  }

  loadByEmail(mail:string) {
    this._rfidDevice.Anagrafica= new Anagrafica();
 
    this.manageRfidFormService.getUserDetailByEmail(mail)
        .subscribe(data => {
    this._rfidDevice.Anagrafica = data.json().Anagrafica;
    this.initForm();
    this._tipsMail = [];
    this.watchEmilField();
    })
  }

  submit() {

    let storeId = this.manageStoreService.GetlocalStoreid();
    let applicationUserID= this._configServices.getApplicationUserID();
     this._rfidDevice.Anagrafica.Email = this.RfidForm.value.email;
    this._rfidDevice.Anagrafica.Nome = this.RfidForm.value.nome;
    this._rfidDevice.Anagrafica.Cognome = this.RfidForm.value.cognome;
    this._rfidDevice.Anagrafica.Telefono = this.RfidForm.value.telefono;
    this._rfidDevice.StoreID = storeId
    this._rfidDevice.Anagrafica.ApplicationUserID = applicationUserID

    this._rfidDevice.RfidDeviceCode = this.RfidForm.value.rfidCode;
    this._rfidDevice.ApplicationUserID =applicationUserID;
    this._rfidDevice.StoreID = storeId;


   this.manageRfidFormService.JoinDevicetoAnagrafica(this._rfidDevice)
   .finally(()=>{
     this._notificationservice.CreateNotification();
   })
    .subscribe(res => {
        this._notificationservice.setMessage("Operazione e termita con successo !!!");
         this._notificationservice.setSucess();
     
    },
      err => {
       this._notificationservice.setMessage("Operazione non è andata a buon fine !!!");
        if(err._body =="inUse")
           this._notificationservice.setMessage("Questo disposistivo è già assegnato ad un altro utente !!!");
           
       
         this._notificationservice.setError();

      });
  }

  clearForm() {

 this.ngOnInit();
    this._rfidDevice = new RfidDevice();
    this._rfidDevice.Anagrafica = new Anagrafica();
   
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

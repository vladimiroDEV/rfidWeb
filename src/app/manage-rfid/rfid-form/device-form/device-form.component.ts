import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Anagrafica, AnagraficaRfid, Rfid } from '../../manage-refid.models';
import { ManageRfidFormService } from '../../manage-rfid.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

@Input() onBack;

 anagrafica:Anagrafica;
 anagraficaRfid:AnagraficaRfid;
 refid:Rfid;
DeviceForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder
  )
   { 
     this.anagrafica = manageRfidFormService.getAnagrafica();
   }

  ngOnInit() {
     this.DeviceForm = this.fb.group({
      'rfidCode':'',
      'credito': '',
      'ExpyreDate': '',
    });

      console.log(this.manageRfidFormService);
  }

  back() {

        this.onBack();
    }

     submit() {
       this.manageRfidFormService.rfid.RfidCode = this.DeviceForm.value.refidCode;
       this.manageRfidFormService.anagraficaRfid.Credit  = this.DeviceForm.value.credito;
       this.manageRfidFormService.anagraficaRfid.ExpiryDate = this.DeviceForm.value.ExpyreDate;


        console.log(this.manageRfidFormService);
    

    }

}

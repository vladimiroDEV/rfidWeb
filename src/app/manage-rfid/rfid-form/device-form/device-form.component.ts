import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Anagrafica, AnagraficaRfid } from '../../manage-refid.models';
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
  }

  back() {

        this.onBack();
    }

     submit() {

        console.log(this.manageRfidFormService);
    

    }

}

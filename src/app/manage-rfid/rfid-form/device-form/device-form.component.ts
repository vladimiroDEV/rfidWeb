import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Anagrafica,  Rfid } from '../../manage-refid.models';
import { ManageRfidFormService } from '../../manage-rfid.service';
import { ManageRfidComponent } from '../../manage-rfid.component';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

@Input() onBack;

 anagrafica:Anagrafica;
 refid:Rfid;
DeviceForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder
  )
   {
   }

  ngOnInit() {
     this.DeviceForm = this.fb.group({
      'rfidCode':new FormControl(this.manageRfidFormService.rfid.RfidCode ),
      'credito': new FormControl(this.manageRfidFormService.rfid.Credit),
      'ExpyreDate': new FormControl(this.manageRfidFormService.rfid.ExpirationDate),
    });
     
  }

  back() {
        this.setValue();
        this.onBack();
    }
    undo() {
      this.onBack();
      this.manageRfidFormService.destroy();
    }

     submit() {
      this.setValue();
      console.log(this.manageRfidFormService.getRfid());

     this.manageRfidFormService.createRfid(this.manageRfidFormService.getRfid())

     
    }

    setValue() {
       this.manageRfidFormService.rfid.RfidCode = this.DeviceForm.value.rfidCode;
       this.manageRfidFormService.rfid.AppUserID = 1 ;  // da sostituire con user id 
       this.manageRfidFormService.rfid.Credit  = this.DeviceForm.value.credito;
       this.manageRfidFormService.rfid.ExpirationDate= this.DeviceForm.value.ExpyreDate;
    }

}

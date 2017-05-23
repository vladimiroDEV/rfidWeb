import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Anagrafica, AnagraficaRfid, Rfid } from '../../manage-refid.models';
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
 anagraficaRfid:AnagraficaRfid;
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
      'credito': new FormControl(this.manageRfidFormService.anagraficaRfid.Credit),
      'ExpyreDate': new FormControl(this.manageRfidFormService.anagraficaRfid.ExpiryDate),
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
      this.manageRfidFormService.createRfid(this.manageRfidFormService.getManageRfidFormModel())

        console.log(this.manageRfidFormService);
    

    }

    setValue() {
       this.manageRfidFormService.rfid.RfidCode = this.DeviceForm.value.rfidCode;
       this.manageRfidFormService.rfid.UserId = 1 ;  // da sostituire con user id 
       this.manageRfidFormService.anagraficaRfid.Credit  = this.DeviceForm.value.credito;
       this.manageRfidFormService.anagraficaRfid.ExpiryDate = this.DeviceForm.value.ExpyreDate;
    }

}

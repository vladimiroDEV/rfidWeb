import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Rfid } from '../manage-refid.models';
import { ManageRfidFormService } from '../manage-rfid.service';

@Component({
  selector: 'app-get-rfid',
  templateUrl: './get-rfid.component.html',
  styleUrls: ['./get-rfid.component.css']
})
export class GetRfidComponent implements OnInit {

@Output() readRfidEvent = new EventEmitter<Rfid>();  

GetRfidForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.GetRfidForm = this.fb.group({
      "code":''
    })
  }

  readCode() {
    this.manageRfidFormService.rfid.RfidCode = this.GetRfidForm.value.code;
    this.manageRfidFormService.getRfidByCode().subscribe(item => {
      this.readRfidEvent.emit(item.json());
    });  
   
  }


}

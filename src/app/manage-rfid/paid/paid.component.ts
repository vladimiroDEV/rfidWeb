import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManageRfidFormService } from '../manage-rfid.service';
import { Rfid } from '../manage-refid.models';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {

_rfid = new Rfid();

PaidForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder) {  this._rfid.Credit =0;}

  ngOnInit() {
    this.PaidForm = this.fb.group({
     "importo":''
    })
  }

  readRfid(rfid:Rfid) { 
    this._rfid = rfid;
    console.log(this._rfid);
  }

paid(){
 this._rfid.Credit = this._rfid.Credit - this.PaidForm.value.importo;

 this.manageRfidFormService.paidAction(this._rfid);
}
  
}

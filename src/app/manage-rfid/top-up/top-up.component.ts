import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManageRfidFormService } from '../manage-rfid.service';
import { Rfid } from '../manage-refid.models';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {


TopUpForm:FormGroup;

_rfid = new Rfid();
readView = false;
paidView = false;
esitoRicaricaView = false;
viewBoxInfo = false;
  constructor( private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder) { }

  ngOnInit() {
     this.TopUpForm = this.fb.group({
     "importo":''
    })
    this.readView = true;
  }
  readRfid(rfid:Rfid) { 
    this._rfid = rfid;
    this.readView = false;
    this.paidView = true;
    this.viewBoxInfo = true;
  
  }


  topup(){
  this._rfid.Credit = this._rfid.Credit + this.TopUpForm.value.importo;
 this.manageRfidFormService.paidAction(this._rfid).subscribe(res=> {
    this.esitoRicaricaView = true;
    this.paidView = false;
    
 });
}

}

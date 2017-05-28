import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManageRfidFormService } from '../manage-rfid.service';
import { Rfid } from '../manage-refid.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {

_rfid = new Rfid();
readView = false;
paidView = false;
esitoPagamentoView = false;
viewBoxInfo = false;
allertCredito= false;


PaidForm:FormGroup;
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.PaidForm = this.fb.group({
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

paid(){
 this.manageRfidFormService.paidAction(this._rfid).subscribe(res=> {

   if(this._rfid.Credit - this.PaidForm.value.importo < 0) {
     this.allertCredito = true;
     return;
   }
    this.esitoPagamentoView = true;
    this.paidView = false;
    this._rfid.Credit = this._rfid.Credit - this.PaidForm.value.importo;
 });
}
  
}

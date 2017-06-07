import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../manage-refid.models';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})
export class TotalAmountComponent implements OnInit {

readRfidView = false;
TotalInfoView = false;
ResultInfoView = false;

allTransactions: Transaction[] = [];

ReadRfidForm:FormGroup;

  constructor(
     private _manageRfidService: ManageRfidService,
     private _fb:FormBuilder,

  ) { }

  ngOnInit() {
    this.readRfidView = true;

    this.ReadRfidForm = this._fb.group ({
      'rfidCode': ['', Validators.required]
    });    
  }

  getTotal() {
    if(this.ReadRfidForm.value.rfidCode != '')
        this._manageRfidService.getAllTransactionRfid(this.ReadRfidForm.value.rfidCode)
        
        .subscribe((res)=>{
          this.allTransactions = res.json();

         this.TotalInfoView = true;
         this.readRfidView = false;
        },
        err=>{
          console.log(err)
        })
  }

  paidTotal(){

  }

}

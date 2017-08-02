import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfidDeviceTransaction } from '../manage-refid.models';
import { RfidDevice } from 'app/manage-rfid/manage-refid.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationType } from "app/shared/models/SharedModels";

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})
export class TotalAmountComponent implements OnInit {

  readRfidView = false;
  TotalInfoView = false;

  _notificationMessage = "";
  _notificationType = NotificationType.info
  
  ResultInfoView = false;
  ResultErrorView = false;
  rfidCode = "";
  Totale:number = 0;

  allTransactions: RfidDeviceTransaction[] = [];

  ReadRfidForm: FormGroup;

  constructor(
    private _manageRfidService: ManageRfidService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    // controlla i parametri 
    this._route.params
      .subscribe((params: Params) => {
        if (params['code'] != null) {
          this.readRfidView = false;
          this.getAllTransaztion(params['code']);
        }
        else {
         
          this.readRfidView = true;

          this.ReadRfidForm = this._fb.group({
            'rfidCode': ['', Validators.required]
          });
        }
      });

  }

  getTotal() {
    if (this.ReadRfidForm.value.rfidCode != '')
      this.getAllTransaztion(this.ReadRfidForm.value.rfidCode);
  }

 
  paidTotalReset() {
    this._manageRfidService.paidTotalReset(this.rfidCode)
      .subscribe((res) => {
        this.ResultInfoView = true;
        this.TotalInfoView = false;
        this.ResultErrorView = false;
      },
      err => {
        this.ResultInfoView = false;
        this.TotalInfoView = false;
        this.ResultErrorView = true;
      });
  }
  getAllTransaztion(rfideCode) {
    this.rfidCode = rfideCode
    this._manageRfidService.getAllTransactionsToPaydOff(rfideCode)

      .subscribe((res) => {
        this.allTransactions = res.json();
        this.allTransactions.forEach(operation => {
          this.Totale += operation.Importo;
        })


        this.TotalInfoView = true;
        this.readRfidView = false;
      },
      err => {
        console.log(err)
      })
  }

}



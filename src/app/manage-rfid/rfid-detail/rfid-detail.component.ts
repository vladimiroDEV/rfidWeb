import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDeviceTransaction, PaidModel } from "app/shared/models/manage-refid.models";



@Component({
  selector: 'app-rfid-detail',
  templateUrl: './rfid-detail.component.html',
  styleUrls: ['./rfid-detail.component.css']
})
export class RfidDetailComponent implements OnInit, OnChanges {

@Input() rfidCode: string;
 @Output() NotificationPaidTotal = new EventEmitter();

ViewDeatail = true;
ViewOperationMessages = false;
ViewOperationMessagesSuccessed = false;
ViewOperationMessagesFaliure = false;

totalToPay = 0;

  allTransactions: RfidDeviceTransaction[] = [];

ngOnChanges(changes: any) {

    this.getAllTransaztion();

}

  constructor(
    private _manageRfidService: ManageRfidService
  ) { }

  ngOnInit() {
    this.getAllTransaztion();
  }

   getAllTransaztion() {
   
    this._manageRfidService.getAllTransactionsToPaydOff(this.rfidCode)
      .subscribe((res) => {
         this.totalToPay = 0;
        this.allTransactions =[];
        this.allTransactions = res.json();
        console.log(this.allTransactions);
      
        this.allTransactions.forEach(el=> {
          this.totalToPay += el.Importo;
          console.log(this.totalToPay);
        })
      },
      err => {
        console.log(err)
      })
  }
 paidTotalReset() {
   let paidModel = new PaidModel();
   paidModel.RfidCode = this.rfidCode;
   paidModel.Price = this.totalToPay;
  
    this._manageRfidService.paidTotalReset(paidModel)
      .subscribe((res) => {
        this.ViewOperationMessagesSuccessed = true;
      },
      err => {
         this.ViewDeatail = false;
        this.ViewOperationMessages =
         true;
        this.ViewOperationMessagesFaliure = true;
      });
  }

  okclick() {
    this.ViewOperationMessagesSuccessed = false;  
    this.NotificationPaidTotal.emit();


  }

}

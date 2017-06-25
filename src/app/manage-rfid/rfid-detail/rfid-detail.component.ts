import { Component, OnInit, Input } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { Transaction } from '../manage-refid.models';

@Component({
  selector: 'app-rfid-detail',
  templateUrl: './rfid-detail.component.html',
  styleUrls: ['./rfid-detail.component.css']
})
export class RfidDetailComponent implements OnInit {

@Input() rfidCode: string;

ViewDeatail = true;
ViewOperationMessages = false;
ViewOperationMessagesSuccessed = false;
ViewOperationMessagesFaliure = false;

totalToPay = 0;

  allTransactions: Transaction[] = [];
  constructor(
    private _manageRfidService: ManageRfidService
  ) { }

  ngOnInit() {
    this.getAllTransaztion();
  }

   getAllTransaztion() {
    this.totalToPay = 0;
    this._manageRfidService.getAllTransactionRfid(this.rfidCode)

      .subscribe((res) => {
        this.allTransactions = res.json();
      
        this.allTransactions.forEach(el=> {
          this.totalToPay += el.Importo;
        })
      },
      err => {
        console.log(err)
      })
  }
 paidTotalReset() {
    this._manageRfidService.paidTotalReset(this.rfidCode)
      .subscribe((res) => {
        this.ViewDeatail = false;
        this.ViewOperationMessages = true;
        this.ViewOperationMessagesSuccessed = true;
      },
      err => {
         this.ViewDeatail = false;
        this.ViewOperationMessages =
         true;
        this.ViewOperationMessagesFaliure = true;
      });
  }

}

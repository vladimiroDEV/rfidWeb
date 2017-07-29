import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDeviceTransaction } from '../manage-refid.models';


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

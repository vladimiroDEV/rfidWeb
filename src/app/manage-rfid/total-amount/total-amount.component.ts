import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfidDevice, RfidDeviceTransaction} from "app/shared/models/manage-refid.models";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationType } from "app/shared/models/SharedModels";

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})
export class TotalAmountComponent implements OnInit {

  readRfidView:boolean = false;
  TotalInfoView:boolean = false;

  _notificationMessage = "";
  _notificationType = NotificationType.info
  _notificationView = false;
  
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
        this._notificationMessage ="L'operazione è andata a buon fine";
        this._notificationType = NotificationType.success;
        this.TotalInfoView = false;
        this.readRfidView = false;
        this._notificationView = true;
      },
      err => {
        this._notificationMessage ="L'operazione NON è andata a buon fine!";
        this._notificationType = NotificationType.danger;
        this.TotalInfoView = false;
        this.readRfidView = false;
        this._notificationView = true;
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
         if (err.status == 404) {
        this._notificationMessage ="Questo disositivo non e associato a nessun utente!";
         }
         else {
         this._notificationMessage ="Si è verificato un errore!";
         }
         this._notificationType = NotificationType.danger;
        this.TotalInfoView = false;
        this.readRfidView = false;
        this._notificationView = true;

         
      })
  }

}



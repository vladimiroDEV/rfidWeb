import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfidDevice, RfidDeviceTransaction } from "app/shared/models/manage-refid.models";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})
export class TotalAmountComponent implements OnInit {

  readRfidView:boolean = false;
  TotalInfoView:boolean = false;
  
  rfidCode = "";
  Totale:number = 0;

  allTransactions: RfidDeviceTransaction[] = [];

  ReadRfidForm: FormGroup;

  constructor(
    private _manageRfidService: ManageRfidService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationService:NotificationService

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
         this._notificationService.setSucess();
         this._notificationService.setMessage("L'operazione è andata a buon fine")
        this._notificationService.CreateNotification();
        this.TotalInfoView = false;
        this.readRfidView = false;

      },
      err => {
            this._notificationService.setError();
         this._notificationService.setMessage("L'operazione NON è andata a buon fine!");
        this._notificationService.CreateNotification();
      });
  }
  getAllTransaztion(rfideCode) {  
    this._manageRfidService.getAllTransactionsToPaydOff(rfideCode)

      .subscribe((res) => {
        console.log(res);
        this.allTransactions = res.json();
        this.allTransactions.forEach(operation => {
          this.Totale += operation.Importo;
          this.Totale = parseFloat(this.Totale.toFixed(2));
        
        })

        this.TotalInfoView = true;
        this.readRfidView = false;
     
      },
      err => {
        this._notificationService.setError();
         if (err.status == 404) {
         this._notificationService.setMessage("Questo disositivo non e associato a nessun utente!");
         }
         else {
     
         this._notificationService.setMessage("Si è verificato un errore!");
         }
      
        this._notificationService.CreateNotification()

         
      })
  }

}



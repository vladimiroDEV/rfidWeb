import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, PaidModel } from "app/shared/models/manage-refid.models";
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notification/notification.service';
import { ManageStoreService } from "app/shared/services/manage-store.service";

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {

  _rfid = new RfidDevice();
  _paidModel = new PaidModel();
  isProcessing = false;



  PaidForm: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private manageRfidService: ManageRfidService,
    private fb: FormBuilder,
    private _notificationService: NotificationService, ) { }

  ngOnInit() {
    this.clearForm();
  }
  paid(form: NgForm) {
 this._paidModel = this.PaidForm.value;
    if (form.valid) {
      /// StoreID viene settato all'interno del servizzio
      let price:string =  this.PaidForm.get('price').value;
      let clearPrice = parseFloat(price.toString().replace(',','.').replace(' ',''))
      this._paidModel.RfidCode = this.PaidForm.get('rfidCode').value;
       this._paidModel.Price = clearPrice;
        this._paidModel.Descrizione =  this.PaidForm.get('descrizione').value;
      
      this.isProcessing=true;
      this.manageRfidService.paidAction(this._paidModel)
        .finally(()=>{
          this.isProcessing = false;
          this._notificationService.CreateNotification();
        }
        )
        .subscribe(result => {
       
         this._notificationService.setSucess();
         this._notificationService.setMessage("Il pagamento è andato a buon fine")
       
        },
        err => {
           this._notificationService.setError();
            this._notificationService.setMessage("Si sono verificati dei errori durnte il pagamento!")
          if (err._body=="NoDevice") {
             this._notificationService.setMessage("Il dispositivo no è stato trovato");
             if(err._body=="NoAnagrafica")
                this._notificationService.setMessage("Questo Disposistivo NON è assiciato a nessun utente!!");
    
        
          }
        }
        );

    }

  }

  back() {
    this.clearForm();

  }
  clearForm() {
    this.PaidForm = this.fb.group({
      "price": ['', Validators.required],
      "descrizione": ['', Validators.required],
      "rfidCode": ['', Validators.required],
    })
  }

}

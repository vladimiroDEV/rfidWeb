import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, PaidModel } from "app/shared/models/manage-refid.models";
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notification/notification.service';

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
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.clearForm();
  }
  paid(form: NgForm) {
 this._paidModel = this.PaidForm.value;
    if (form.valid) {
      this._paidModel = this.PaidForm.value;
      
      this.isProcessing=true;
      this.manageRfidService.paidAction(this._paidModel)
        .finally(()=>this.isProcessing = false)
        .subscribe(result => {
       
         this._notificationService.setSucess();
         this._notificationService.setMessage("Il pagamento è andato a buon fine")
        this._notificationService.CreateNotification();
        },
        err => {
          if (err.status == 404) {
            
        this._notificationService.setError();
         this._notificationService.setMessage("Il dispositivo no è stato trovato nel  oppure il dispositivo no è stato assegnato!")
        this._notificationService.CreateNotification();
          }else {
        this._notificationService.setError();
         this._notificationService.setMessage("Si sono verificati dei errori durnte il pagamento!")
        this._notificationService.CreateNotification();
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

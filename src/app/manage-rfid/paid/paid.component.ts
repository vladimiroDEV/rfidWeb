import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { RfidDevice, PaidModel } from "app/shared/models/manage-refid.models";
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationType } from "app/shared/models/SharedModels";

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {

  _rfid = new RfidDevice();
  _paidModel = new PaidModel();

  _notificationMessage = "";
  _notificationType = NotificationType.info;
   paidFormView = false;


  PaidForm: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private manageRfidService: ManageRfidService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.clearForm();
    this.paidFormView = true;
  }
  paid(form: NgForm) {
 this._paidModel = this.PaidForm.value;
    console.log(form);
console.log( this._paidModel);
    if (form.valid) {
      this._paidModel = this.PaidForm.value;
      
      this.manageRfidService.paidAction(this._paidModel)
        .subscribe(result => {
         this._notificationMessage = "Il pagamento è andato a buon fine";
         this._notificationType = NotificationType.success;
          this.paidFormView = false;
        },
        err => {
          if (err.status == 404) {
            this.paidFormView = false;
         this._notificationType = NotificationType.danger;
          this._notificationMessage = "Il dispositivo no è stato trovato nel  oppure il dispositivo no è stato assegnato!";
          }else {
          this._notificationMessage = "Si sono verificati dei errori durnte il pagamento";
           this._notificationType = NotificationType.danger;
          this.paidFormView = false;
          }
        }
        );

    }

  }

  back() {
    this.paidFormView = true;
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

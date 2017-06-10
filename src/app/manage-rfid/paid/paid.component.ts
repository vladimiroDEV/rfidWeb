import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ManageRfidService } from '../manage-rfid.service';
import { Rfid, PaidModel } from '../manage-refid.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {

  _rfid = new Rfid();
  _paidModel = new PaidModel();

  paidFormView = false;
  esitoPagamentoView = false;
  allertErrorView = false;

  allertErrorMessage = '';

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
          this.esitoPagamentoView = true;
          this.paidFormView = false;
        },
        err => {
          if (err.status == 404) {
            this.paidFormView = false;
            this.allertErrorView = true;
            this.allertErrorMessage = "Il dispositivo no è stato trovato nel sistema";
          }
        }
        );

    }

  }

  back() {
    this.allertErrorMessage = '';
    this.allertErrorView = false;
    this.esitoPagamentoView = false;
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

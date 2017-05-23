import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManageRfidFormService } from '../manage-rfid.service';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit {


PaidForm:FormGroup;
  constructor(
    private manageRfidFormService:ManageRfidFormService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.PaidForm = this.fb.group({
      "code":''
    })
  }

  readCode() {
    this.manageRfidFormService.rfid.RfidCode = this.PaidForm.value.code;
    this.manageRfidFormService.getRfidByCode();

  }

  

}

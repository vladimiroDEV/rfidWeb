import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { StoreModel } from "app/manage-store/manage-store.models";
import { ManageStoreService } from "app/shared/services/manage-store.service";

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {


  StoreForm: FormGroup;
  storeModel:StoreModel = new StoreModel();
  constructor(
    private _manageStoreService: ManageStoreService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.initForm();


  }

  submit()  {

    this.storeModel.Name = this.StoreForm.value.nome;
    this.storeModel.Telefono = this.StoreForm.value.telefono;
    this.storeModel.Address = this.StoreForm.value.address;

    this._manageStoreService.CreateStore(this.storeModel).subscribe(res=> console.log(res),err=>console.log(err));

  }


  initForm() {
    this.StoreForm = this.fb.group({

      'nome': '',
      'telefono': '',
      'address': '',
    });
  }

}

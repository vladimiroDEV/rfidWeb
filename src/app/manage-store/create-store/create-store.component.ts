import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { StoreModel } from "app/manage-store/manage-store.models";
import { ManageStoreService } from "app/shared/services/manage-store.service";
import { NotificationService } from "app/shared/notification/notification.service";


@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {


  StoreForm: FormGroup;
  storeModel:StoreModel = new StoreModel();

  isRequesting:boolean = false;
  constructor(
    private _manageStoreService: ManageStoreService,
    private notificationService: NotificationService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.initForm();


  }

  submit()  {

    
    this.storeModel.Name = this.StoreForm.value.nome;
    this.storeModel.Telefono = this.StoreForm.value.telefono;
    this.storeModel.Address = this.StoreForm.value.address;
   this.isRequesting = true;
    this._manageStoreService.CreateStore(this.storeModel)
    .finally(()=> {
      this.isRequesting = false;
      this.notificationService.CreateNotification();
    })
    .subscribe(
      res=> {
        this._manageStoreService.SetStoreID(res.store_id);
        this.notificationService.setSucess();
        this.notificationService.setMessage("Operazione è andata a buon fine");
        },
        err=>{
          this.notificationService.setError();
        this.notificationService.setMessage("Operazione NON è andata a buon fine Riprovare");
        });

  }


  initForm() {
    this.StoreForm = this.fb.group({

      'nome': '',
      'telefono': '',
      'address': '',
    });
  }

}

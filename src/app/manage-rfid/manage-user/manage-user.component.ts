import { Component, OnInit, ChangeDetectorRef, Output } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailViewModel } from "app/shared/models/manage-refid.models";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  ReadRfidForm: FormGroup;
  userDetailModel = new UserDetailViewModel();
  total: number = 0;
  _totalDevice:number = 0;
  rfidCodeDetail ='';
  rfidLogoPath = '../../assets/images/device_rfid_logo.jpg';



  userInfoView = false;
  readView = true;
  noDeviceUserView = false;
  viewRfidDetail = false;
  constructor(
    private _manageRfidService: ManageRfidService,
    private _fb: FormBuilder,
    private _router:Router,
    private _cd: ChangeDetectorRef 

    

  ) { }

  ngOnInit() {
    this.ReadRfidForm = this._fb.group({
      'rfidCode': '',
      'email': ''
    })
    this.total = 0;
  }

  getUserByDetail(form: NgForm) {
    let email = '';
    let rfidCode = '';
    if (this.ReadRfidForm.value.email != ''){
       this.getuserDetailByEmail(this.ReadRfidForm.value.email);
  }
    else if (this.ReadRfidForm.value.rfidCode != ''){

      console.log(this.ReadRfidForm.value.rfidCode);
      this.getuserDetailByCode(this.ReadRfidForm.value.rfidCode );
    }
     

  }
  calculateTotal() {
    this.total =0;
      this.userDetailModel.Dispositivi.forEach(dis=>{
        this.total += dis.Credit;
      })
  }

  viewDetail(code:string){
    this.viewRfidDetail = false;
    this.rfidCodeDetail = '';
     this.rfidCodeDetail = code;
    
    this.viewRfidDetail = true;
   
  }
  totalPaid() {
     this._manageRfidService.totalPaid(this.userDetailModel.Anagrafica.Email)
     .subscribe(res=>{
      console.log(res);
     },
     err=>{
 console.log(err);
     })
  }

  // events 

  NotificationPaidTotal(){
    this.getuserDetailByEmail(this.userDetailModel.Anagrafica.Email);
     this.viewRfidDetail = false;
  }

  // methods 

   

   // restituisce i dispositivi associati all'utente
  getuserDetailByCode(code:string ){

 this._manageRfidService.getUserDetailByRfidCode(code)
        .subscribe(res => {
          this.userDetailModel = res.json();
          this.userInfoView = true;
          this.readView = false;
          this.calculateTotal();

        },
        err => {
          this.readView = false;
        this.noDeviceUserView = true;
        });
  }
    getuserDetailByEmail(email:string ){
        this._manageRfidService.getUserDetailByEmail(email)
        .subscribe(res => {
          this.userDetailModel = res.json();
          this.userInfoView = true;
          this.readView = false;
          this.calculateTotal();
          
          this._cd.markForCheck();
        },
        err => {
        this.readView = false;
        this.noDeviceUserView = true;
        });

    }
  

}

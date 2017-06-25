import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserDetailViewModel } from '../manage-refid.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  ReadRfidForm: FormGroup;
  userDetailModel = new UserDetailViewModel();
  total: number;
  rfidCodeDetail ='';

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
      this.getuserDetailByCode(this.ReadRfidForm.value.rfidCode );
    }
     

  }
  calculateTotal() {
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

  // events 

  NotificationPaidTotal(){
    this.getuserDetailByEmail(this.userDetailModel.Anagrafica.Email);
     this.viewRfidDetail = false;
  }

  // methods 

   
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
          
          this._cd.markForCheck();
        },
        err => {
          console.log(err);
        });

    }
  

}

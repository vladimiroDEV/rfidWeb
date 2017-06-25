import { Component, OnInit } from '@angular/core';
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
    private _router:Router
    

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
    if (this.ReadRfidForm.value.email != '')
      this._manageRfidService.getUserDetailByEmail(this.ReadRfidForm.value.email)
        .subscribe(res => {
          this.userDetailModel = res.json();
          this.userInfoView = true;
          this.readView = false;
          this.calculateTotal();
        },
        err => {
          console.log(err);
        });

    if (this.ReadRfidForm.value.rfidCode != '')
      this._manageRfidService.getUserDetailByRfidCode(this.ReadRfidForm.value.rfidCode)
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
  calculateTotal() {
      this.userDetailModel.Dispositivi.forEach(dis=>{
        this.total += dis.Credit;
      })
  }

  viewDetail(code:string){
    this.rfidCodeDetail = '';
     this.rfidCodeDetail = code;
    
    this.viewRfidDetail = true;
   
  }

   

  

}

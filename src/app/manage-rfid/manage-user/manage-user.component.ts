import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserDetailViewModel } from '../manage-refid.models';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

ReadRfidForm:FormGroup;
userDetailModel = new UserDetailViewModel();

userInfoView = false;
readView= true;
  constructor(
    private _manageRfidService: ManageRfidService,
    private _fb:FormBuilder

  ) { }

  ngOnInit() {
    this.ReadRfidForm = this._fb.group({
      'rfidCode':'',
      'email':''
    })
  }

  getUserByDetail(form: NgForm) {
     let email = '';
     let rfidCode = '';
      if(this.ReadRfidForm.value.email != '')
        this._manageRfidService.getUserDetailByEmail(this.ReadRfidForm.value.email)
        .subscribe(res=>{
            this.userDetailModel = res.json();
        },
        err=>{
           console.log(err);
        });
        
  }

}

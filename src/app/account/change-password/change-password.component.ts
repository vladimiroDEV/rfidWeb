import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { AccountService } from "app/account/account.service";
import { ChangePassword } from "app/account/account.models";
import { NotificationService } from "app/shared/notification/notification.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  ChangePasswordForm: FormGroup;
  errorMessage:string ='';

  changPasswordModel: ChangePassword = new ChangePassword();
  constructor(
    private fb:FormBuilder,
    private _accountService: AccountService,
    private _notificationSevice:NotificationService,
    private _router:Router
     ) { 
      this.initForm();
  }

  ngOnInit() {
  

  }

  change() {

   this.changPasswordModel.clear();
   this.errorMessage ='';
    this.changPasswordModel.newPassword = this.ChangePasswordForm.get('newPassword').value;
    this.changPasswordModel.oldPassword = this.ChangePasswordForm.get('oldPassword').value;
    
    this._accountService.changePassword(this.changPasswordModel)
    .subscribe(res=> {

    },
  err=>{
   if(err.status== 400){
     if(err._body == '2'){  // changePasswordStatus 
      this.errorMessage = "la password non corrisponede" ;
      this._router.navigate(['/notification']);
      this._notificationSevice.setError();
      this._notificationSevice.setMessage("si sono verificati dei errori");
      this._notificationSevice.CreateNotification();
      this._notificationSevice.updateNotification.emit;
      
     }
     else {
        ///fare redirect errore generico 
     }
    
   }
  })
    
    
  }

initForm(){
      this.ChangePasswordForm = this.fb.group({
         'oldPassword': ['', Validators.required],
         'newPassword': ['', Validators.required],
          'rpPassword': ['', Validators.required]
    },{
      
      validator: this.repeatePasswordValidator
    });
    }

repeatePasswordValidator(AC: AbstractControl) {

  let newPassword = AC.get('newPassword').value;
  let rpPassword = AC.get('rpPassword').value;
  if (newPassword != rpPassword) {
    AC.get('rpPassword').setErrors({ 'MatchPassword': true });
  } else {
    return null;
  }


}


}

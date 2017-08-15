import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from "app/shared/notification/notification.service";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

 errors: string;  
 isRequesting: boolean;
 submitted: boolean = false;

 optionsRoles:string[];

 isAdministrator:boolean = false;

 
 
 constructor(private userService: UserService,private router: Router,
      private _notificationService:NotificationService) { 
   
 }

  ngOnInit() {
    this.optionsRoles = this.userService.getAvailableRoles();
 
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
     this.submitted = true;
     this.isRequesting = true;
     this.errors='';

     let role = "Default";

     if(this.userService.isStoreAdministrator()) 
         role = value.role;


     else if(this.userService.isStoreAdministrator())
          role = "StoreOperator";

     if(valid)
     {
         this.userService.register(value.email,value.password,value.firstName,value.lastName,value.role)
                   .finally(() => {
                     this.isRequesting = false;
                     this._notificationService.CreateNotification();
                        })
                   .subscribe(
                     result  => {if(result){
                          
                       this._notificationService.setSucess();
                       this._notificationService.setMessage("Operazione è andata a buon fine");
                       

                         this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
                     }},
                     errors => { 
                       this.errors = errors});
     }      
  }  
}

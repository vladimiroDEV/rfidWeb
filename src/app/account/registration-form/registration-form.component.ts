import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from "app/shared/notification/notification.service";
import { FormGroup, FormBuilder } from "@angular/forms";



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

 errors: string;  
 isRequesting: boolean;
 submitted: boolean = false;

 RegistrationForm:FormGroup;



 optionsRoles:string[];

 isAdministrator:boolean = false;

 EditMode:boolean= false;

 _userRegistration: UserRegistration;

 
 
 constructor(
    private userService: UserService,
    private router: Router,
    private _notificationService:NotificationService,
    private route: ActivatedRoute,
     private fb:FormBuilder) { 
   
 }

  ngOnInit() {

    this._userRegistration = new UserRegistration();
      this.initForm();

    this.isAdministrator = this.userService.isAdministrator();
    this.optionsRoles = this.userService.getAvailableRoles();
    
    this.route.params.subscribe(
      (params:Params) => {

        console.log("Params");
        console.log(params);
        this.EditMode = params['email'] != null;

        if(this.EditMode)

          this.userService.getUsersDetail(params['email'])
          .subscribe(
            res=>{
              this._userRegistration = res.json();
            },
            err=> {
              this.errors = "Errore durante il caricamento, Riprovare!";
            }
          );

        
      }
    );
 
  }

  initForm() {

    this.RegistrationForm = this.fb.group({
       'firstname':[this._userRegistration.firstName],
       'lastname':[this._userRegistration.lastName],
       'email':[this._userRegistration.email],
       'password':'',
       'role':[this._userRegistration.role]

    });
  }

  registerUser() {
     this.submitted = true;
     this.isRequesting = true;
     this.errors='';

     let role = "Default";
     let userRegistration:UserRegistration = new UserRegistration();

     if(this.userService.isStoreAdministrator()) 
         role = this.RegistrationForm.get('role').value;


     else if(this.userService.isStoreAdministrator())
          role = "StoreOperator";

     if(this.RegistrationForm.valid)
     {

      userRegistration.firstName = this.RegistrationForm.get('firstName').value;
      userRegistration.lastName = this.RegistrationForm.get('lastName').value;
      userRegistration.email = this.RegistrationForm.get('email').value;
      userRegistration.password = this.RegistrationForm.get('password').value;
      userRegistration.role = role

       if(this.EditMode){
          this.updateUser(userRegistration);
       }
       
       else {
          this.createNewUser(userRegistration);
       }
     }      
  }  

  createNewUser(value: UserRegistration) {
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
  updateUser(value: UserRegistration) {

    this.userService.updateUser(value.email, value.firstName, value.lastName, value.role)
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

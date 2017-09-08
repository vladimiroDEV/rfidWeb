import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from "app/shared/notification/notification.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";



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
     private fb:FormBuilder,
    private _location:Location) { 
   
 }

  ngOnInit() {
   

    this._userRegistration = new UserRegistration();
      this.initForm();

    this.isAdministrator = this.userService.isAdministrator();
    this.optionsRoles = this.userService.getAvailableRoles();
    
    this.route.params
    
    .subscribe(
      (params:Params) => {

        console.log("Params");
        console.log(params);
        this.EditMode = params['email'] != null;
        console.log( params['email'])
        console.log(  this.EditMode);

        if(this.EditMode){

           this.isRequesting= true;
           this.userService.getUsersDetail(params['email'])
           .finally(()=>{
            this.isRequesting = false;
          })
          .subscribe(
            res=>{
              console.log(res);
              this._userRegistration = res;
               console.log(this._userRegistration);
              this.initForm();
            },
            err=> {
               console.log(err);
              this.errors = "Errore durante il caricamento, Riprovare!";
            }
          );
      }

        
      }
    );
 
  }

  initForm() {

    this.RegistrationForm = this.fb.group({
       'firstname':new FormControl(this._userRegistration.FirstName),
       'lastname':new FormControl(this._userRegistration.LastName),
       'email':new FormControl(this._userRegistration.Email),
       'password':'',
       'role':new FormControl(this._userRegistration.Role)

    });
  }

  registerUser() {
     this.submitted = true;
     this.isRequesting = true;
     this.errors='';

     let role = "Default";
     let userRegistration:UserRegistration = new UserRegistration();

     if(this.userService.isAdministrator()) {
         role = this.RegistrationForm.get('role').value;
         console.log(role);
     }


     else if(this.userService.isStoreAdministrator())
          role = "StoreOperator";

     if(this.RegistrationForm.valid)
     {

      userRegistration.FirstName = this.RegistrationForm.get('firstname').value;
      userRegistration.LastName = this.RegistrationForm.get('lastname').value;
      userRegistration.Email = this.RegistrationForm.get('email').value;
      userRegistration.Password = this.RegistrationForm.get('password').value;
      userRegistration.Role = role

       if(this.EditMode){
          this.updateUser(userRegistration);
       }
       
       else {
          this.createNewUser(userRegistration);
       }
     }      
  }  

  createNewUser(value: UserRegistration) {
     this.userService.register(value.Email,value.Password,value.FirstName,value.LastName,value.Role)
                   .finally(() => {
                     this.isRequesting = false;
                     this._notificationService.CreateNotification();
                        })
                   .subscribe(
                     result  => {if(result){
                          
                       this._notificationService.setSucess();
                       this._notificationService.setMessage("Operazione è andata a buon fine");
                       

                         this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.Email}});                         
                     }},
                     errors => { 
                       this.errors = errors});

  }
  updateUser(value: UserRegistration) {

    this.userService.updateUser(value.Email, value.FirstName, value.LastName, value.Role)
          .finally(() => {
                     this.isRequesting = false;
                     this._notificationService.CreateNotification();
                        })
                   .subscribe(
                     result  => {if(result){
                          
                       this._notificationService.setSucess();
                       this._notificationService.setMessage("Operazione è andata a buon fine");
                       

                         this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.Email}});                         
                     }},
                     errors => { 
                       this.errors = errors});


  }

  goBack(){
      
     this._location.back();

  }

  
}

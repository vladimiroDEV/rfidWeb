import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "app/shared/services/user.service";
import { ActivatedRoute } from '@angular/router';
import { OperatorModel } from '../manage-operator.models';

@Component({
  selector: 'app-edit-operator',
  templateUrl: './edit-operator.component.html',
  styleUrls: ['./edit-operator.component.css']
})
export class EditOperatorComponent implements OnInit {


  OperatorForm:FormGroup;
 _operatorModel:OperatorModel;

  
  constructor(
    private fb:FormBuilder,
   private _userService:UserService,
   private route: ActivatedRoute) { }

  ngOnInit() {

  this._operatorModel= new OperatorModel();
  this._operatorModel.storeId  
  this.infitForm();
  }

  infitForm(){
    this .OperatorForm =this.fb.group({
      'email':[this._operatorModel.email],
      'name': [this._operatorModel.name],
      'password':[this._operatorModel.password]
      
    })
  }

  submit() {
      this._operatorModel.email = this.OperatorForm.value.email;
      this._operatorModel.name = this.OperatorForm.value.name;
      this._operatorModel.password = this.OperatorForm.value.password;
      console.log(this.OperatorForm);

       this._userService.createOperator(this._operatorModel).subscribe(
         res=>{
           console.log(res);

         },
         err =>{
            console.log(err);
         }
       )


  }
  

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: 'app-edit-operator',
  templateUrl: './edit-operator.component.html',
  styleUrls: ['./edit-operator.component.css']
})
export class EditOperatorComponent implements OnInit {


  OperatorForm:FormGroup;


  
  constructor(private fb:FormBuilder, private _userService:UserService) { }

  ngOnInit() {
  this.infitForm();
  }

  infitForm(){
    this.fb.group({
      'email':'',
      'password':''
      
    })
  }

  submit() {
       this._userService


  }
  

  clearForm() {

  }

}

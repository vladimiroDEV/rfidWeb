import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  ChangePasswordForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.ChangePasswordForm = this.fb.group({
         'oldPassword': ['', Validators.required],
         'newPassword': ['', Validators.required],
          'rpPassword': ['', Validators.required]
    });
  }

  change(form: FormGroup) {
  console.log(form);
  }

}

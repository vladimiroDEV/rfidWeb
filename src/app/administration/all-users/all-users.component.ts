import { Component, OnInit } from '@angular/core';
import { UserService } from "app/shared/services/user.service";
import { ApplicationUserVM } from "app/account/account.models";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {


   applicationUsers:ApplicationUserVM[];
   isRequesting = true;
   loadingError:boolean = false;
  constructor(private _userServices: UserService) { }

  ngOnInit() {
     
    this._userServices.getAllUsers()
     .finally(() => {
         this.isRequesting = false;})
    .subscribe((res)=>{
      let appUser:ApplicationUserVM = new ApplicationUserVM();
      console.log(res.json());
      this.applicationUsers = res.json();
      this.loadingError = false;

      console.log(res.json());
     
    },
  err=>{
    console.log(err);
    this.loadingError = true;
  });

  }

}

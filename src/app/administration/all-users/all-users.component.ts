import { Component, OnInit } from '@angular/core';
import { UserService } from "app/shared/services/user.service";
import { ApplicationUserVM } from "app/account/account.models";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "app/shared/notification/notification.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {


   applicationUsers:ApplicationUserVM[];
   isRequesting = true;
   loadingError:boolean = false;
  constructor(
    private _userServices: UserService,
    private _notification: NotificationService,
  private route:ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
     
    this._userServices.getAllUsers()
     .finally(() => {
         this.isRequesting = false;})
    .subscribe((res)=>{
      let appUser:ApplicationUserVM = new ApplicationUserVM();
      this.applicationUsers = res.json();
      this.loadingError = false;
     
    },
  err=>{
    console.log(err);
    this.loadingError = true;
  });

  }

  editUser(email:string) {

    this.router.navigate(['../'+email+'/edit'],{relativeTo:this.route});

  }

  DeleteUser(email:string){
    if(confirm("Are you sure to delete "+email)) {
      this.isRequesting = true;
        this._userServices.DeleteUser(email)
        .finally(() => { 
          this.isRequesting =false;
          this._notification.CreateNotification()})
        .subscribe(res=> {
          this._notification.setMessage("Eliminazione è avvenuta con succeso"),
          this._notification.setSucess();
          
        },
      err=>{
        this._notification.setMessage("l'operazioneNon è andata a buon fine. Riprovare!"),
          this._notification.setError();
          
      })
  }
  }

}

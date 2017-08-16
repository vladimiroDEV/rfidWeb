import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

 status: boolean;
 subscription:Subscription;
 isAdministrator:boolean= false;
 isStoreAdministrator:boolean= false;
 isOperator:boolean= false;


 
  constructor(private _userService:UserService, private _roleGuard: AuthRoleGuard) { }
logout() {
     this._userService.logout();
     
        
  }

  ngOnInit() {
    this.isAdministrator = this._userService.isAdministrator();
    this.isStoreAdministrator = this._userService.isStoreAdministrator();
    this.isOperator = this._userService.isStoreOperator();
   
    this.subscription = this._userService.authNavStatus$.subscribe(status => this.status = status);
  }

   ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}

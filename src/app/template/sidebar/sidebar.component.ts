import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "app/shared/services/user.service";
import { Subscription } from "rxjs/Subscription";
import { AuthRoleGuard } from "app/shared/services/auth.role.guard";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {


   status: boolean;
 subscription:Subscription;
 isAdministrator:boolean= false;
 isStoreAdministrator:boolean= false;
 isOperator:boolean= false;

  constructor(private _userService:UserService, private _roleGuard: AuthRoleGuard) { }

  ngOnInit() {

    this.isAdministrator = this._userService.isAdministrator();
    this.isStoreAdministrator = this._userService.isStoreAdministrator();
    this.isOperator = this._userService.isStoreOperator();
   
    this.subscription = this._userService.authNavStatus$.subscribe(status => this.status = status);
  }


  logout() {
     this._userService.logout();
     
        
  }

   ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}

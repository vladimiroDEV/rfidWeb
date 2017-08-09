// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthRoleGuard implements CanActivate {


  constructor(
    private _userService: UserService,
    private _router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let roles = route.data["roles"] as Array<string>;

    if(this._userService.haveUserRole(roles)) return true;
     
    this._router.navigate(['/login']);
      return false;
  }




}
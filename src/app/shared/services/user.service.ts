import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map'

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';
import { OperatorModel } from '../../manage-operators/manage-operator.models';
import { ApplicationUserVM } from "app/account/account.models";
import { Router } from "@angular/router";

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(
    private http: Http, 
    private configService: ConfigService,
  private _router:Router) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }



    register(email: string, password: string, firstName: string, lastName: string,role: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,role });

    return this.http.post(this.baseUrl + "/accounts/register", 
            body, 
            this.configService.getRequestOptions())
      .map(res => true)
      .catch(this.handleError);
  }  

  updateUser(email: string,  firstName: string, lastName: string,role: string): Observable<UserRegistration> {

     let body = JSON.stringify({ email, firstName, lastName,role });
      return this.http.post(this.baseUrl + "/accounts/updateUser", 
            body, 
            this.configService.getRequestOptions())
      .map(res => true)
      .catch(this.handleError);

  }

   login(userName, password) {
    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),this.configService.getRequestOptions() 
      )
      .map(res => res.json())
      .map(res => {
       localStorage.setItem('userMail', res.userMail);
       localStorage.setItem('Rfid_AppliactionUserID', res.Rfid_AppliactionUserID);
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('userRoles',res.userRoles);

      
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
     localStorage.removeItem('userMail');
    localStorage.removeItem('Rfid_AppliactionUserID');
    localStorage.removeItem('userRoles');
    if(localStorage.getItem('store_id')) 
      localStorage.removeItem('store_id');

    this.loggedIn = false;
    this._authNavStatusSource.next(false);

     this._router.navigate(['/login']);
      return false;
    
  }

  createOperator(operatorModel:OperatorModel){

    operatorModel.storeId = +localStorage.getItem('store_id');
    return this.http.post(
        this.configService.getApiURI()+'/accounts/registerOperator',
        JSON.stringify(operatorModel),
        this.configService.getRequestOptions()

    );

    // id of 
  }

  getAllUsers() {
    return this.http.get(this.baseUrl+'/accounts/allusers',this.configService.getRequestOptions())
   // .map((res:ApplicationUserVM[])=>res.json())
  }

  getUsersDetail(email:string) {
    return this.http.get(this.baseUrl+'/accounts/userDetail/'+email,this.configService.getRequestOptions())
    .map((res) => res.json())
   // .map((res:ApplicationUserVM[])=>res.json())
  }

  DeleteUser(email:string){
         return this.http.post(this.baseUrl+'/accounts/DeleteUser',JSON.stringify(email),this.configService.getRequestOptions())
  }





  isLoggedIn() {
    return this.loggedIn;
  }

  getAvailableRoles(){

    let allroles = [ "Default","Administrator","StoreAdministrator","StoreOperator" ];

    if(this.isAdministrator)
         return allroles = allroles.filter(i=>i != "StoreOperator")

    else if(this.isStoreAdministrator)
        return allroles = allroles.filter(i=>i != "Administrator" && i != "Default")
   
      else return [];
      
  }


  isAdministrator() {
       return this.haveUserRole(["Administrator"]);
  }

  isStoreAdministrator(){
    return this.haveUserRole(["StoreAdministrator"]);
  }

  isStoreOperator() {
 return this.haveUserRole(["StoreOperator"]);
  }
  isDefaultuser() {
 return this.haveUserRole(["Default"]);
  }

  CurrentUserEmail():string {

  if(localStorage.getItem('userMail'))
     {
         
         return localStorage.getItem('userMail')
      }
        else { return 'non definito';}
  }





    
  haveUserRole(roles : Array<string>):boolean {
       
        let result:boolean;
        result = false;
     
      if(!localStorage.getItem('userRoles')) {
         result = false;
         return result;
      }
        

        let uresRoles = localStorage.getItem('userRoles').split(',');
         roles.slice().forEach((item:string) => {
           if(uresRoles.indexOf(item) > -1) {
            result = true;
          } // esiste

      });
      return result;
  }


  
}


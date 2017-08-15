import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';
import { OperatorModel } from '../../manage-operators/manage-operator.models';

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
    private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string,role: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,role });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/accounts/register", body, options)
      .map(res => true)
      .catch(this.handleError);
  }  

   login(userName, password) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),options 
      )
      .map(res => res.json())
      .map(res => {
       localStorage.setItem('Rfid_AppliactionUserID', res.Rfid_AppliactionUserID);
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('userRoles',res.userRoles);

        if(res.store_id > 0) 
          localStorage.setItem('store_id',res.store_id);
      
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('Rfid_AppliactionUserID');
    localStorage.removeItem('userRoles');
    if(localStorage.getItem('store_id')) 
      localStorage.removeItem('store_id');

    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    
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


  
}


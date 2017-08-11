import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { NotificationModel, NotificationType } from "app/shared/notification/notification.models";
import { EventEmitter } from "events";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Injectable()
export class NotificationService {
  private notificationmodel: NotificationModel = new NotificationModel();


  constructor(private _router:Router) { }

  
  CreateNotification() {

    this._router.navigate(['/notification', 
        this.notificationmodel.notificationType,
        this.notificationmodel.notificationMessage]);
  }


  setSucess(){
     this.notificationmodel.notificationType = NotificationType.success;
  }
  setError() {
   this.notificationmodel.notificationType = NotificationType.error;
  }
  setMessage(message: string){
    this.notificationmodel.notificationMessage = message;
  }

}

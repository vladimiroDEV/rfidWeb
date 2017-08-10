import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { NotificationModel, NotificationType } from "app/shared/notification/notification.models";
import { EventEmitter } from "events";

@Injectable()
export class NotificationService {

  private notificationSubject = new Subject<NotificationModel>()
  private notificationmodel: NotificationModel = new NotificationModel();

   public updateNotification = new EventEmitter();
  

  constructor() { }

  public notificationevents$= this.notificationSubject.asObservable();
  
  CreateNotification() {
  
    this.notificationSubject.next(this.notificationmodel);
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

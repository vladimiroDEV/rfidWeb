import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { NotificationModel, NotificationType } from "app/shared/notification/notification.models";
import { EventEmitter } from "events";
import { Observable } from "rxjs/Observable";

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
  getNotification(): Observable<NotificationModel> {
     return this.notificationSubject.asObservable();
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

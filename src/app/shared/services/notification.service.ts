import { Injectable } from '@angular/core';
import { NotificationType } from '../models/SharedModels';



@Injectable()
export class NotificationService  {

_message:string;
_notificationType:NotificationType;

constructor() {}


clear() {
    this._message = '';
    this._notificationType = NotificationType.info;

}
getMessage():string {
  return this._message;
}
getNotificationType():NotificationType {
  return this._notificationType;
}
setMessage(message:string){ 
    
    this._message = message;
    
}
setNotificationType(notificationType:NotificationType) {
  this._notificationType = notificationType;
}
}

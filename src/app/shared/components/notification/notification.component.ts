import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationType } from '../../models/SharedModels';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,OnDestroy {


  @Input() notificationMessage:string;
  @Input() notifiacationType:NotificationType;

  constructor(
    //private _notifiactionService:NotificationService
    
  ) { 
    
  }

  ngOnInit() {
  //    console.log("initi");
  //   console.log('Notification' +this._notifiactionService.getMessage());
  //  this._notificationMessage = this._notifiactionService.getMessage();
  //   this._notifiacationType = this._notifiactionService.getNotificationType();

  }
  ngOnDestroy() {
    console.log("destroy");
  }

  getAlertStyle() {
  let style = "";
    switch(this.notifiacationType) {
      case NotificationType.danger:
      style= "alert alert-dander";
      break;
       case NotificationType.info:
      style= "alert alert-info";
      break;
       case NotificationType.success:
      style= "alert alert-success";
      break;
       case NotificationType.warning:
      style= "alert alert-warning";
      break;
      default:
      style= "alert alert-info";
     break;

  }
  return style;
  }

}

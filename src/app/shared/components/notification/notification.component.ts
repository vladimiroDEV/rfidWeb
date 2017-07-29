import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationType } from '../../models/SharedModels';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,OnDestroy {
  _notificationMessage:string;
  _notifiacationType:NotificationType;

  constructor(
    private _notifiactionService:NotificationService
    
  ) { 
    
  }

  ngOnInit() {
     console.log("initi");
    console.log('Notification' +this._notifiactionService.getMessage());
   this._notificationMessage = this._notifiactionService.getMessage();
    this._notifiacationType = this._notifiactionService.getNotificationType();

  }
  ngOnDestroy() {
    console.log("destroy");
  }

}

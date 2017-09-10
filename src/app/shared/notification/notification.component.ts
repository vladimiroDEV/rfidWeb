import { Component, OnInit } from '@angular/core';
import { NotificationService } from "app/shared/notification/notification.service";
import { NotificationModel, NotificationType} from "app/shared/notification/notification.models";
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
 

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

 public  notificationmodel:NotificationModel; 

  constructor(private _notificationService: NotificationService,
   private _router:Router,
   private _route: ActivatedRoute,
   private _location:Location) {
    
  }

  ngOnInit() {
    this.notificationmodel = new NotificationModel();
     this._route.params.subscribe(params => {
     this.notificationmodel.notificationType = +params['type'] as NotificationType; 
     this.notificationmodel.notificationMessage = params['message'];       
       } );
  }

  goBack() {
     this._location.back();
  }
  goHome() {
    this._router.navigate(['/']);
  }

    getAlertStyle() {
  let style = "";
    switch(this.notificationmodel.notificationType) {
      case NotificationType.error:
      style= "alert alert-danger";
      break;
       case NotificationType.info:
      style= "alert alert-info";
      break;
       case NotificationType.success:
      style= "alert alert-info";
      break;
      default:
      style= "alert alert-info";
     break;

  }
  return style;
  }

}

import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { NotificationService } from "app/shared/notification/notification.service";
import { NotificationModel, NotificationType} from "app/shared/notification/notification.models";
 

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

 public  notificationmodel:NotificationModel; 
 
  //  notifiacationType:NotificationType;
  //  notificationMessage:string ='';
  constructor(private _notificationService: NotificationService, private _cd: ChangeDetectorRef, private _zone:NgZone) {
    
    this.notificationmodel = new NotificationModel();

    //this.notificationmodel.notificationMessage ="Tutto OK";
    
  }

  ngOnInit() {

   

    this._notificationService.notificationevents$
        .map(data=>this.notificationmodel)
        .subscribe(data => console.log(data));


        console.log(this.notificationmodel);
    // .subscribe(
    //   (data:NotificationModel) =>{
    //     this._zone.run(()=> {

    //     this.notificationmodel = data;
       
    //    this.notificationmodel.notificationMessage = data.notificationMessage;
    //    this.notificationmodel.notificationType = data.notificationType;
    //    this._cd.detectChanges();

   
    //  this.notificationmodel.notificationMessage ="non va bene ";
    //      console.log(data);
    //      });
  
    // });

 
    console.log(this.notificationmodel.notificationMessage);
    console.log(this.notificationmodel.notificationType);
    


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
      style= "alert alert-success";
      break;
      default:
      style= "alert alert-info";
     break;

  }
  return style;
  }

}

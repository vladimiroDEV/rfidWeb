
export class NotificationModel {
    notificationMessage:string;
    notificationType: NotificationType;
}

export enum NotificationType{
    
     success=1,
     info=2,
     error=3
}
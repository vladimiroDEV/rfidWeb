import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten';
import { myFocus } from '../directives/focus.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotificationModule } from 'app/shared/notification/notification.module';


@NgModule({
  imports: [
    CommonModule,
    NotificationModule
  ],
  declarations: [
    ShortenPipe,
    myFocus,
    SpinnerComponent
    ],
    exports:[myFocus,SpinnerComponent],
   
})
export class SharedModule { }




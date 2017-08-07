import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from "app/manage-rfid/devices/devices.component";
import { DevicesListComponent } from "app/manage-rfid/devices/devices-list/devices-list.component";
import { DeviceDetailComponent } from "app/manage-rfid/devices/device-detail/device-detail.component";
import { DeviceService } from "app/manage-rfid/devices/devices.service";

@NgModule({
  imports: [
    CommonModule,
   
  ],
  declarations: [
     DevicesComponent, 
    DevicesListComponent, 
    DeviceDetailComponent
  ],
  providers: [
    DeviceService
  ]

})
export class DevicesModule { }

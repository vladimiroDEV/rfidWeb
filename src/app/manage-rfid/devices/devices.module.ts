import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from "app/manage-rfid/devices/devices.component";
import { DevicesListComponent } from "app/manage-rfid/devices/devices-list/devices-list.component";
import { DeviceDetailComponent } from "app/manage-rfid/devices/device-detail/device-detail.component";

import { ManageRfidService } from "app/manage-rfid/manage-rfid.service";
import { DevicesService } from "app/manage-rfid/devices/devices.service";
import { DeviceListItemComponent } from './devices-list/device-list-item/device-list-item.component';
import {PopoverModule} from "ngx-popover";

@NgModule({
  imports: [
    CommonModule,
    PopoverModule
   
  ],
  declarations: [
     DevicesComponent, 
    DevicesListComponent, 
    DeviceDetailComponent, DeviceListItemComponent
  ],
  providers: [
    DevicesService,
    ManageRfidService
  ]

})
export class DevicesModule { }

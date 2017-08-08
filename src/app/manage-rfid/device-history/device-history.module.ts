import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceHistoryListComponent } from './device-history-list/device-history-list.component';
import { DeviceHistoryListItemComponent } from './device-history-list/device-history-list-item/device-history-list-item.component';
import { DeviceHistoryComponent } from "app/manage-rfid/device-history/device-history.component";
import { DeviceHistoryService } from "app/manage-rfid/device-history/device-history.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DeviceHistoryListComponent, DeviceHistoryListItemComponent,DeviceHistoryComponent],
  providers: [DeviceHistoryService]
})
export class DeviceHistoryModule { }

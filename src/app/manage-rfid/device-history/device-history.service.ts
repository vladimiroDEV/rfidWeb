import { Injectable } from '@angular/core';
import { ManageRfidService } from "app/manage-rfid/manage-rfid.service";

@Injectable()
export class DeviceHistoryService {

  constructor(private _manageRfidService: ManageRfidService) { }




  getDevicesHistory(deviceCode:string){
    return this._manageRfidService.getDeviceHistory(deviceCode);
  }

}

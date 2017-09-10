import { Injectable } from '@angular/core';
import { ManageRfidService } from "app/manage-rfid/manage-rfid.service";

@Injectable()
export class DevicesService {



  constructor(private _manageRfidDevicesSeriveices: ManageRfidService) { }


  getDevices() {
    return this._manageRfidDevicesSeriveices.getStoreDevices();
  }
  
 

}

import { Component, OnInit } from '@angular/core';
import { DevicesService } from "app/manage-rfid/devices/devices.service";
import { RfidDevice } from "app/shared/models/manage-refid.models";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

_devicesList:RfidDevice[];
  _countAll:number;
  _countActive:number;
  _countNotActive:number;
  constructor(private _devicesService: DevicesService) { }

  ngOnInit() {
     this._devicesService.getDevices()
    .subscribe(res=>
    {

      this._countActive = 0;
      this._countAll=0;
      this._countNotActive =0;
      this._devicesList = res.json();
      this._countAll = this._devicesList.length;
    
      this._devicesList.forEach(element => {

        if(element.Active == true)
        this._countActive ++;
        else this._countNotActive ++       
      });
        
      
    })
  }

}

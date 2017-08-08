import { Component, OnInit, Input } from '@angular/core';
import { RfidDevice } from "app/shared/models/manage-refid.models";
import { DevicesService } from "app/manage-rfid/devices/devices.service";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],

})
export class DevicesListComponent implements OnInit {


@Input() _devicesList:RfidDevice[];

  constructor(private _devicesService: DevicesService) { }

  ngOnInit() {
   
  }

}

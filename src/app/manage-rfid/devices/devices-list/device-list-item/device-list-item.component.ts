import { Component, OnInit, Input } from '@angular/core';
import { RfidDevice } from "app/shared/models/manage-refid.models";


@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.css']
})
export class DeviceListItemComponent implements OnInit {

@Input() _device: RfidDevice;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }


}

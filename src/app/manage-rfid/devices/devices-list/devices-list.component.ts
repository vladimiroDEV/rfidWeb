import { Component, OnInit } from '@angular/core';
import { RfidDevice } from "app/shared/models/manage-refid.models";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {


devicesList:RfidDevice[];

  constructor() { }

  ngOnInit() {
  }

}

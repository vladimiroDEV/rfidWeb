import { Component, OnInit } from '@angular/core';
import { RfidDevice } from "app/manage-rfid/manage-refid.models";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

_rfid  = new RfidDevice();
readView = false;
  constructor() { }

  ngOnInit() {
  }


    readRfid(rfid:RfidDevice) { 
    this._rfid = rfid;

  
  }

}

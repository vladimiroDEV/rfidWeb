import { Component, OnInit } from '@angular/core';
import { Rfid } from "app/manage-rfid/manage-refid.models";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

_rfid  = new Rfid();
readView = false;
  constructor() { }

  ngOnInit() {
  }


    readRfid(rfid:Rfid) { 
    this._rfid = rfid;

  
  }

}

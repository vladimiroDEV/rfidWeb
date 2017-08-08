import { Component, OnInit, Input } from '@angular/core';
import { RfidDevice } from "app/shared/models/manage-refid.models";
import {Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.css']
})
export class DeviceListItemComponent implements OnInit {

@Input() _device: RfidDevice;
  constructor(private _router: Router,
  private _route: ActivatedRoute) { }

  ngOnInit() {
  }

viewHistory(deviceCode: string){
 this._router.navigate(
       ['device-history'],
       {
         queryParams:{code:deviceCode},
         relativeTo: this._route
       
      });
}


}

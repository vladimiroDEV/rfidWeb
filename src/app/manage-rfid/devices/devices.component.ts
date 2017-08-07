import { Component, OnInit } from '@angular/core';
import { DevicesService } from "app/manage-rfid/devices/devices.service";
import { RfidDevice } from "app/shared/models/manage-refid.models";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  _devicesList: RfidDevice[];
  _allDevices: RfidDevice[];
  _countAll: number;
  _countActive: number;
  _countNotActive: number;
  _totalDebit:number;
  _currentViewDevices='active';
  constructor(private _devicesService: DevicesService) { }

  ngOnInit() {
    this._devicesService.getDevices()
      .subscribe(res => {

        this._countActive = 0;
        this._countAll = 0;
        this._countNotActive = 0;
        this._totalDebit =0;
        this._allDevices = res.json();
        this._countAll = this._allDevices.length;

        this._allDevices.forEach(element => {

          if (element.Active == true){

           this._countActive++;
           //calcolo il debito totale
           this._totalDebit += element.Credit;
          }
           
          else this._countNotActive++
          
           

        });

     this.viewActiveDevices();
      });
   
  }

  viewAllDevices() {
    this._devicesList = this._allDevices;
    this. _currentViewDevices='all';
  }
  viewActiveDevices() {
   this._devicesList = this._allDevices.filter(item=>item.Active==true);
   this. _currentViewDevices='active';
  }

  viewNotActiveDevices() {
 this._devicesList = this._allDevices.filter(item=>item.Active==false);
 this. _currentViewDevices='notActive';
  }
}

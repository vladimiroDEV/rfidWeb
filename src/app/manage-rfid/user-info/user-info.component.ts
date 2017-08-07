import { Component, OnInit, Input } from '@angular/core';
import { Anagrafica } from "app/shared/models/manage-refid.models";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
 @Input() Anagrafica: Anagrafica;
  constructor() { }

  ngOnInit() {
  }

}

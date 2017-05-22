import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    private _router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit() {
  }

  createNew() {
    this._router.navigate(['new'], {relativeTo: this._route});
  }

}

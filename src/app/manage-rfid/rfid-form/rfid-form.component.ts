import { Component, OnInit } from '@angular/core';
import { ClaimStep } from '../manage-refid.models';

@Component({
  selector: 'app-rfid-form',
  templateUrl: './rfid-form.component.html',
  styleUrls: ['./rfid-form.component.css']
})
export class RfidFormComponent implements OnInit {

wizard: ClaimStep;
  constructor(private _claimStep:ClaimStep) { 
    this.wizard = _claimStep;
  }

  ngOnInit() {
  }

  onNext = () => {
        this.wizard.addStep();
    }

    onBack = () => {
        this.wizard.subtractStep();
    }

}

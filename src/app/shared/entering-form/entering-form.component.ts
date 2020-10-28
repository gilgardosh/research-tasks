import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { credentials } from '../../models';

@Component({
  selector: 'app-entering-form',
  templateUrl: './entering-form.component.html',
  styleUrls: ['./entering-form.component.scss'],
})
export class EnteringFormComponent implements OnInit {
  @Output() gotCreds: EventEmitter<credentials> = new EventEmitter<
    credentials
  >();
  family = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  creds: credentials = {
    family: '',
    twin: 'a',
    gender: 'male',
  };
  invalidFamilyFlag: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  start(): credentials | void {
    if (!!this.family.errors || this.family.value == 0) {
      this.invalidFamilyFlag = true;
    } else {
      this.creds.family = this.family.value;
      this.invalidFamilyFlag = false;
      this.gotCreds.emit(this.creds);
    }
  }
}

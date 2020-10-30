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
  schoolID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  childID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  creds: credentials = {
    schoolID: '',
    childID: 'a',
    gender: 'M',
  };
  invalidSchoolIDFlag: boolean = false;
  invalidChildIDFlag: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  start(): credentials | void {
    if (!!this.schoolID.errors || this.schoolID.value == 0) {
      this.invalidSchoolIDFlag = true;
    } else if (!!this.childID.errors || this.childID.value == 0) {
      this.invalidSchoolIDFlag = false;
      this.invalidChildIDFlag = true;
    } else {
      this.creds.schoolID = this.schoolID.value;
      this.creds.childID = this.childID.value;
      this.invalidSchoolIDFlag = false;
      this.invalidChildIDFlag = false;
      this.gotCreds.emit(this.creds);
    }
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models';

@Component({
  selector: 'app-entering-form',
  templateUrl: './entering-form.component.html',
  styleUrls: ['./entering-form.component.scss'],
})
export class EnteringFormComponent implements OnInit {
  @Output() gotCreds: EventEmitter<Credentials> = new EventEmitter<
    Credentials
  >();
  schoolID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  childID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  creds: Credentials = {
    schoolID: '',
    childID: 'a',
    gender: 'M',
  };
  invalidSchoolIDFlag = false;
  invalidChildIDFlag = false;

  constructor() {}

  ngOnInit(): void {}

  start(): Credentials | void {
    if (!!this.schoolID.errors || this.schoolID.value === 0) {
      this.invalidSchoolIDFlag = true;
    } else if (!!this.childID.errors || this.childID.value === 0) {
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

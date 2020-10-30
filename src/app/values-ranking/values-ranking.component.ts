import { Component, OnInit } from '@angular/core';
import { credentials } from '../models';
import { valuesRankingData } from './value-ranking.service';

@Component({
  selector: 'app-values-ranking',
  templateUrl: './values-ranking.component.html',
  styleUrls: ['./values-ranking.component.scss'],
  providers: [valuesRankingData],
})
export class ValuesRankingComponent implements OnInit {
  /**
   * scenes:
   * 1 - entering form
   * 2 - introduce values set 1
   * 3 - rank values set 1
   * 4 - introduce values set 2
   * 5 - rank values set 2
   * 6 - summary
   */

  scene: number = 1;
  creds: credentials;

  constructor(private dataService: valuesRankingData) {}

  ngOnInit(): void {}

  scene1(creds: credentials) {
    this.dataService.schoolID = creds.schoolID;
    this.dataService.childID = creds.childID;
    this.dataService.setGender(creds.gender);
    this.scene = 2;
  }

  scene2(endFlag: boolean) {
    if (endFlag) {
      this.scene = 3;
    }
  }

  scene3(endFlag: boolean) {
    if (endFlag) {
      this.scene = 4;
    }
  }

  scene4(endFlag: boolean) {
    if (endFlag) {
      this.scene = 5;
    }
  }

  scene5(endFlag: boolean) {
    if (endFlag) {
      this.scene = 6;
    }
  }
  calculateData() {
    let finalData = {};
    console.log(finalData);
  }
}

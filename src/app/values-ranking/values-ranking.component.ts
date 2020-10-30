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
   * Stages:
   * 1 - entering form
   * 2 - introduce values set 1
   * 3 - rank values set 1
   * 4 - introduce values set 2
   * 5 - rank values set 2
   * 6 - summary
   */
  stage: number = 1;
  // mainData: valuesRankingData = new valuesRankingData();
  mainData = {
    creds: null,
    'rank-set1': null,
    'rank-set2': null,
  };
  creds: credentials;

  constructor(private dataService: valuesRankingData) {}

  ngOnInit(): void {}

  stage1(creds: credentials) {
    this.dataService.schoolID = creds.schoolID;
    this.dataService.childID = creds.childID;
    this.dataService.setGender(creds.gender);
    this.stage = 2;
  }

  stage2(endFlag: boolean) {
    if (endFlag) {
      this.stage = 3;
    }
  }

  stage3(endFlag: boolean) {
    if (endFlag) {
      this.stage = 4;
    }
  }

  stage4(endFlag: boolean) {
    if (endFlag) {
      this.stage = 5;
    }
  }

  stage5(ranking2Data: any) {
    this.mainData['rank-set2'] = ranking2Data;
    this.calculateData();
    this.stage = 6;
  }

  calculateData() {
    let finalData = {};
    console.log(finalData);
  }
}

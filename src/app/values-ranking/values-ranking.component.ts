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

  stage3(ranking1Data: any) {
    this.mainData['rank-set1'] = ranking1Data;
    this.stage = 4;
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
    let finalData = {
      // schoolID: this.mainData.creds.schoolID,
      // childID: this.mainData.creds.childID,
      // gender: this.mainData.creds.gender,
      // PBVS1: this.getKeyByValue(this.mainData['rank-set1'], 3),
      // PBVS2: this.getKeyByValue(this.mainData['rank-set1'], 2),
      // PBVS3: this.getKeyByValue(this.mainData['rank-set1'], 6),
      // PBVS4: this.getKeyByValue(this.mainData['rank-set1'], 7),
      // PBVS5: this.getKeyByValue(this.mainData['rank-set1'], 8),
      // PBVS6: this.getKeyByValue(this.mainData['rank-set1'], 1),
      // PBVS7: this.getKeyByValue(this.mainData['rank-set1'], 0),
      // PBVS8: this.getKeyByValue(this.mainData['rank-set1'], 4),
      // PBVS9: this.getKeyByValue(this.mainData['rank-set1'], 5),
      // PBVS10: this.getKeyByValue(this.mainData['rank-set1'], 9),
      // PBVS11: this.getKeyByValue(this.mainData['rank-set2'], 12),
      // PBVS12: this.getKeyByValue(this.mainData['rank-set2'], 10),
      // PBVS13: this.getKeyByValue(this.mainData['rank-set2'], 11),
      // PBVS14: this.getKeyByValue(this.mainData['rank-set2'], 13),
      // PBVS15: this.getKeyByValue(this.mainData['rank-set2'], 14),
      // PBVS16: this.getKeyByValue(this.mainData['rank-set2'], 18),
      // PBVS17: this.getKeyByValue(this.mainData['rank-set2'], 15),
      // PBVS18: this.getKeyByValue(this.mainData['rank-set2'], 19),
      // PBVS19: this.getKeyByValue(this.mainData['rank-set2'], 16),
      // PBVS20: this.getKeyByValue(this.mainData['rank-set2'], 17),
    };
    console.log(finalData);
  }

  // getKeyByValue(object, value) {
  //   let key = Object.keys(object).find((key) => object[key].valNum === value);
  //   let renkVal: number;
  //   switch (key) {
  //     case 'veryvery': {
  //       renkVal = 5;
  //       break;
  //     }
  //     case 'vary1': {
  //     }
  //     case 'very2': {
  //       renkVal = 4;
  //       break;
  //     }
  //     case 'not1': {
  //     }
  //     case 'not2': {
  //       renkVal = 2;
  //       break;
  //     }
  //     case 'notnot': {
  //       renkVal = 1;
  //       break;
  //     }
  //     case 'average1': {
  //     }
  //     case 'average2': {
  //     }
  //     case 'average3': {
  //     }
  //     case 'average4': {
  //       renkVal = 3;
  //       break;
  //     }
  //   }
  //   return renkVal;
  // }
}

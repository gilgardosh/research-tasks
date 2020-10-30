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
      this.calculateData();
      this.scene = 6;
    }
  }
  calculateData() {
    let finalData = {
      schoolID: this.dataService.schoolID,
      childID: this.dataService.childID,
      gender: this.dataService.gender,
      pbvs1: this.dataService.pbvs1.rank,
      pbvs2: this.dataService.pbvs2.rank,
      pbvs3: this.dataService.pbvs3.rank,
      pbvs4: this.dataService.pbvs4.rank,
      pbvs5: this.dataService.pbvs5.rank,
      pbvs6: this.dataService.pbvs6.rank,
      pbvs7: this.dataService.pbvs7.rank,
      pbvs8: this.dataService.pbvs8.rank,
      pbvs9: this.dataService.pbvs9.rank,
      pbvs10: this.dataService.pbvs10.rank,
      pbvs11: this.dataService.pbvs11.rank,
      pbvs12: this.dataService.pbvs12.rank,
      pbvs13: this.dataService.pbvs13.rank,
      pbvs14: this.dataService.pbvs14.rank,
      pbvs15: this.dataService.pbvs15.rank,
      pbvs16: this.dataService.pbvs16.rank,
      pbvs17: this.dataService.pbvs17.rank,
      pbvs18: this.dataService.pbvs18.rank,
      pbvs19: this.dataService.pbvs19.rank,
      pbvs20: this.dataService.pbvs20.rank,
    };
    console.log(finalData);
  }
}

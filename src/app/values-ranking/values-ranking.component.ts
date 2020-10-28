import { Component, OnInit } from '@angular/core';
import { credentials } from '../models';

@Component({
  selector: 'app-values-ranking',
  templateUrl: './values-ranking.component.html',
  styleUrls: ['./values-ranking.component.scss'],
})
export class ValuesRankingComponent implements OnInit {
  /**
   * Stages:
   * 1 - entering form
   * 2 - introduce values set 1
   * 3 - rank values set 1
   * 4 - introduce values set 2
   * 5 - rank values set 2
   */
  stage: number = 1;
  creds: credentials;

  constructor() {}

  ngOnInit(): void {}

  getcreds(creds: credentials) {
    this.creds = creds;
    this.stage = 2;
  }

  openingEnded(endFlag: boolean) {
    if (endFlag) {
      this.stage = 3;
    }
  }
}

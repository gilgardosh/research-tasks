import { Component, OnInit } from '@angular/core';
import { credentials } from '../models';

@Component({
  selector: 'app-values-ranking',
  templateUrl: './values-ranking.component.html',
  styleUrls: ['./values-ranking.component.scss'],
})
export class ValuesRankingComponent implements OnInit {
  /*  Stages:
      1 - entering form
      2 - opening
      3 - introduce-values
  */
  stage: number = 1;
  creds: credentials;

  constructor() {}

  ngOnInit(): void {}

  getcreds(creds: credentials) {
    this.creds = creds;
    this.stage2();
  }

  stage2() {
    this.stage = 2;

    // let audio = new Audio();
    // audio.src = '../../assets/values-ranking/values_aud/01opening-F.wav';
    // audio.load();
    // audio.play();
  }
}

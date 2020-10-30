import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() data: any;
  veryImg1: string = '';
  veryImg2: string = '';
  notImg1: string = '';
  notImg2: string = '';

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.veryImg1 = `../../assets/values-ranking/values_img/val${this.data['rank-set1'].veryvery.valNum}.png`;
    this.veryImg1 = `../../assets/values-ranking/values_img/val${this.data['rank-set2'].veryvery.valNum}.png`;
    this.notImg1 = `../../assets/values-ranking/values_img/val${this.data['rank-set1'].notnot.valNum}.png`;
    this.notImg1 = `../../assets/values-ranking/values_img/val${this.data['rank-set2'].notnot.valNum}.png`;
    this.audioService.setAudio(
      `../../assets/values-ranking/guidance_aud/end-${
        this.data.creds.gender === 'male' ? 'M' : 'F'
      }.wav`
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() data: any;
  very1: any = {};
  very2: any = {};
  not1: any = {};
  not2: any = {};
  // veryImg1: string = '';
  // veryImg2: string = '';
  // notImg1: string = '';
  // notImg2: string = '';
  randomView: boolean = true;

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {
    this.randomView = Math.random() > 0.5;
    for (let i = 1; i <= 10; i++) {
      let curVal = this.dataService['pbvs' + i];
      if (curVal.rank == 5) {
        this.very1 = curVal;
      } else if (curVal.rank == 1) {
        this.not1 = curVal;
      }
    }
    for (let i = 11; i <= 20; i++) {
      let curVal = this.dataService['pbvs' + i];
      if (curVal.rank == 5) {
        this.very2 = curVal;
      } else if (curVal.rank == 1) {
        this.not2 = curVal;
      }
    }
  }

  ngOnInit(): void {
    this.audioService.setAudio(
      `../../assets/values-ranking/guidance_aud/end-${this.dataService.gender}.wav`
    );
  }
}

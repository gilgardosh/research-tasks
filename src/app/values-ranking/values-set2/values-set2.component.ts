import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Pbvs, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-values-set2',
  templateUrl: './values-set2.component.html',
  styleUrls: ['./values-set2.component.scss'],
  providers: [AudioService],
})
export class ValuesSet2Component implements OnInit {
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  vs2Stage = 1;
  /**
   * vs2Stages:
   * 1 - opening
   * 2 - val12
   * 3 - val10
   * 4 - val11
   * 5 - val13
   * 6 - val14
   * 7 - val18
   * 8 - val15
   * 9 - val19
   * 10 - val16
   * 11 - val17
   */

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.vs2Stage = 1;
    this.subtitle = `כל הכבוד!<br>עכשיו נשחק שוב את המשחק עם תמונות אחרות.<br>נעבור על התמונות אחת - אחת`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/opening2-${this.dataService.gender}.wav`
    );

    this.audioService.getTimeElapsed().subscribe((res) => {
      this.opening(res);
    });

    this.audioService.getPlayerStatus().subscribe((res) => {
      if (res === 'ended') {
        this.vs2Stage += 1;
        this.introduceValues();
      }
    });
  }

  introduceValues() {
    let curVal: Pbvs;
    switch (this.vs2Stage) {
      case 2: {
        curVal = this.dataService.pbvs11;
        break;
      }
      case 3: {
        curVal = this.dataService.pbvs12;
        break;
      }
      case 4: {
        curVal = this.dataService.pbvs13;
        break;
      }
      case 5: {
        curVal = this.dataService.pbvs14;
        break;
      }
      case 6: {
        curVal = this.dataService.pbvs15;
        break;
      }
      case 7: {
        curVal = this.dataService.pbvs16;
        break;
      }
      case 8: {
        curVal = this.dataService.pbvs17;
        break;
      }
      case 9: {
        curVal = this.dataService.pbvs18;
        break;
      }
      case 10: {
        curVal = this.dataService.pbvs19;
        break;
      }
      case 11: {
        curVal = this.dataService.pbvs20;
        break;
      }
      case 12: {
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/${curVal.imgLink}`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/${curVal.audioLink}`
    );
    this.subtitle = curVal.text;
    return 0;
  }

  opening(time: string) {
    switch (time) {
      case '00:08': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          this.dataService.gender === 'M'
            ? 'דמיין שוב שאתה הילד הזה, עם החולצה האפורה'
            : 'דמייני שוב שאת הילדה הזו, עם החולצה האפורה';
        break;
      }
      case '00:12': {
        this.subtitle =
          this.dataService.gender === 'M'
            ? 'ואתה זה שעושה את כל הדברים האלה'
            : 'ואת זו שעושה את כל הדברים האלה';
        break;
      }
    }
  }
}

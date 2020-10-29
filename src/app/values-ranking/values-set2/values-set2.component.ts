import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-values-set2',
  templateUrl: './values-set2.component.html',
  styleUrls: ['./values-set2.component.scss'],
})
export class ValuesSet2Component implements OnInit {
  @Input() isMale: boolean;
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  stage: number = 1;
  /**
   * stages:
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

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.subtitle = `כל הכבוד!<br>עכשיו נשחק שוב את המשחק עם תמונות אחרות.<br>נעבור על התמונות אחת - אחת`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/opening2-${
        this.isMale ? 'M' : 'F'
      }.wav`
    );

    this.audioService.getTimeElapsed().subscribe((res) => {
      this.opening(res);
    });

    this.audioService.getPlayerStatus().subscribe((res) => {
      if (res == 'ended') {
        this.stage += 1;
        this.introduceValues();
      }
    });
  }

  introduceValues() {
    let valNum: number;
    let audioString: string;
    switch (this.stage) {
      /**
       * stages:
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
      case 2: {
        valNum = 12;
        this.subtitle = this.isMale ? 'להיות המנהיג' : 'להיות המנהיגה';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 3: {
        valNum = 10;
        this.subtitle = this.isMale
          ? 'להראות לכולם מה אני יכול'
          : 'להראות לכולם מה אני יכולה';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 4: {
        valNum = 11;
        this.subtitle = 'לעשות חיים';
        audioString = `${valNum}`;
        break;
      }
      case 5: {
        valNum = 13;
        this.subtitle = 'לצאת להרפתקאות';
        audioString = `${valNum}`;
        break;
      }
      case 6: {
        valNum = 14;
        this.subtitle = 'להפעיל את הדמיון';
        audioString = `${valNum}`;
        break;
      }
      case 7: {
        valNum = 18;
        this.subtitle = this.isMale ? 'להיות מוגן ובטוח' : 'להיות מוגנת ובטוחה';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 8: {
        valNum = 15;
        this.subtitle = 'להיות כמו כולם';
        audioString = `${valNum}`;
        break;
      }
      case 9: {
        valNum = 19;
        this.subtitle = 'ללמוד על מה שהיה פעם מזמן';
        audioString = `${valNum}`;
        break;
      }
      case 10: {
        valNum = 16;
        this.subtitle = 'לשמח אחרים';
        audioString = `${valNum}`;
        break;
      }
      case 11: {
        valNum = 17;
        this.subtitle = 'לשמור על הטבע';
        audioString = `${valNum}`;
        break;
      }
      case 12: {
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/val${valNum}.png`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/val${audioString}.wav`
    );
    return 0;
  }

  opening(time: string) {
    switch (time) {
      case '00:08': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle = this.isMale
          ? 'דמיין שוב שאתה הילד הזה, עם החולצה האפורה'
          : 'דמייני שוב שאת הילדה הזו, עם החולצה האפורה';
        break;
      }
      case '00:12': {
        this.subtitle = this.isMale
          ? 'ואתה זה שעושה את כל הדברים האלה'
          : 'ואת זו שעושה את כל הדברים האלה';
        break;
      }
    }
  }
}

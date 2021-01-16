import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Pbvs, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-rank-set1',
  templateUrl: './rank-set1.component.html',
  styleUrls: ['./rank-set1.component.scss'],
  providers: [AudioService],
})
export class RankSet1Component implements OnInit, OnDestroy {
  @Output() gotRanking: EventEmitter<boolean> = new EventEmitter<boolean>();
  isMale = true;
  title: string;
  stage = 1;
  calculating = false;
  playerSubscription: Subscription;
  playerworking: Subscription;

  orderedValues = {
    veryvery: null,
    very1: null,
    very2: null,
    average1: null,
    average2: null,
    average3: null,
    average4: null,
    not1: null,
    not2: null,
    notnot: null,
  };

  valuesStages = [
    'veryvery',
    'notnot',
    'very1',
    'very2',
    'not1',
    'not2',
    'average1',
    'average2',
    'average3',
    'average4',
  ];

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.isMale = this.dataService.gender === 'M';
    this.playSound();
    this.playerworking = this.audioService
      .getPlayerStatus()
      .subscribe((res) => {
        if (res !== 'ended') {
          this.calculating = true;
        } else {
          this.calculating = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.playerSubscription);
    this.unsubscribe(this.playerworking);
  }

  unsubscribe(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  stepback() {
    this.calculating = true;
    this.unsubscribe(this.playerSubscription);
    this.audioService.pauseAudio();
    this.stage -= 1;
    while (this.stage >= 7) {
      this.stage -= 1;
      this.orderedValues[this.valuesStages[this.stage]].isStock = true;
      this.orderedValues[this.valuesStages[this.stage]].rank = null;
      this.orderedValues[this.valuesStages[this.stage]] = null;
    }
    if (this.stage >= 1) {
      this.orderedValues[this.valuesStages[this.stage - 1]].isStock = true;
      this.orderedValues[this.valuesStages[this.stage - 1]].rank = null;
      this.orderedValues[this.valuesStages[this.stage - 1]] = null;
      this.playSound();
    }
    this.calculating = false;
  }

  valueClick(val: Pbvs) {
    if (!this.calculating) {
      this.calculating = true;
      this.unsubscribe(this.playerSubscription);
      this.stage += 1;
      this.playSound();
      val.isStock = false;
      this.orderedValues[this.valuesStages[this.stage - 2]] = val;
      val.rank = this.getRank(this.valuesStages[this.stage - 2]);
      if (this.stage >= 7) {
        const subscription = this.audioService.getPlayerStatus();
        // inner delated func
        const stage7 = () => {
          this.playerSubscription = subscription.subscribe((res) => {
            if (res === 'ended') {
              for (let i = 1; i <= 10; i++) {
                if (this.dataService['pbvs' + i].isStock) {
                  const value = this.dataService['pbvs' + i];
                  this.stage += 1;
                  value.isStock = false;
                  value.rank = this.getRank(this.valuesStages[this.stage - 2]);
                  this.orderedValues[this.valuesStages[this.stage - 2]] = value;
                }
              }
              this.calculating = false;
            }
          });
        };
        setTimeout(stage7, 1000);
      } else {
        this.calculating = false;
      }
    }
  }

  playSound() {
    switch (this.stage) {
      case 1: {
        this.title = this.isMale
          ? 'בראש העמוד אתה יכול לראות שרשום "חשוב מאוד". בחר תמונה אחת שהכי חשובה לך ולאיך שתרצה להיות בחייך, ולחץ עליה'
          : 'בראש העמוד את יכולה לראות שרשום "חשוב מאוד". בחרי תמונה אחת שהכי חשובה לך ולאיך שתרצי להיות בחייך, ולחצי עליה';
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-1-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
        break;
      }
      case 2: {
        this.title = this.isMale
          ? 'בטח יש דברים שבכלל לא חשובים לך. בחר תמונה שלא חשובה לך בכלל ולא חשובה לאיך שתרצה להיות בעתיד'
          : 'בטח יש דברים שבכלל לא חשובים לך. בחרי תמונה שלא חשובה לך בכלל ולא חשובה לאיך שתרצי להיות בעתיד';
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-2-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
        break;
      }
      case 3: {
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-3-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
      }
      case 4: {
        this.title = this.isMale
          ? 'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחר 2 תמונות שמראות משהו שחשוב לך'
          : 'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחרי 2 תמונות שמראות משהו שחשוב לך';
        break;
      }
      case 5: {
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-4-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
      }
      case 6: {
        this.title = this.isMale
          ? 'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחר עוד 2 תמונות בשביל השורה הזאת'
          : 'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחרי עוד 2 תמונות בשביל השורה הזאת';
        break;
      }
      case 7: {
        this.title = 'נשארו לך 4 תמונות. נשים אותן בשורה האמצעית';
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-5-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
        break;
      }
      default: {
        break;
      }
    }
  }

  getRank(rank: string) {
    let renkVal: number;
    switch (rank) {
      case 'veryvery': {
        renkVal = 5;
        break;
      }
      case 'very2' || 'very1': {
        renkVal = 4;
        break;
      }
      case 'not2' || 'not1': {
        renkVal = 2;
        break;
      }
      case 'notnot': {
        renkVal = 1;
        break;
      }
      case 'average4' || 'average3' || 'average2' || 'average1': {
        renkVal = 3;
        break;
      }
    }
    return renkVal;
  }

  getImgLink(num: number) {
    return `../../assets/values-ranking/values_img/val${num}.png`;
  }
}

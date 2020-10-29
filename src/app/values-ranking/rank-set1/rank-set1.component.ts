import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-rank-set1',
  templateUrl: './rank-set1.component.html',
  styleUrls: ['./rank-set1.component.scss'],
})
export class RankSet1Component implements OnInit {
  @Input() isMale: boolean;
  @Output() getRanking: EventEmitter<any> = new EventEmitter<any>();
  title: string;
  stage: number = 1;
  calculating: boolean = false;

  valuesDict: {
    [U: string]: {
      valNum: number;
      text: string;
      imgLink: string;
      isStock: boolean;
    };
  } = {
    val0: {
      valNum: 0,
      text: '',
      imgLink: this.getImgLink(0),
      isStock: true,
    },
    val1: {
      valNum: 1,
      text: '',
      imgLink: this.getImgLink(1),
      isStock: true,
    },
    val2: {
      valNum: 2,
      text: '',
      imgLink: this.getImgLink(2),
      isStock: true,
    },
    val3: {
      valNum: 3,
      text: '',
      imgLink: this.getImgLink(3),
      isStock: true,
    },
    val4: {
      valNum: 4,
      text: '',
      imgLink: this.getImgLink(4),
      isStock: true,
    },
    val5: {
      valNum: 5,
      text: '',
      imgLink: this.getImgLink(5),
      isStock: true,
    },
    val6: {
      valNum: 6,
      text: '',
      imgLink: this.getImgLink(6),
      isStock: true,
    },
    val7: {
      valNum: 7,
      text: '',
      imgLink: this.getImgLink(7),
      isStock: true,
    },
    val8: {
      valNum: 8,
      text: '',
      imgLink: this.getImgLink(8),
      isStock: true,
    },
    val9: {
      valNum: 9,
      text: '',
      imgLink: this.getImgLink(9),
      isStock: true,
    },
  };

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

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.valuesDict.val0.text = `לשמור על החוקים`;
    this.valuesDict.val1.text = `לשמור על הבטיחות`;
    this.valuesDict.val2.text = `להיות הכי טוב${this.isMale ? '' : 'ה'}`;
    this.valuesDict.val3.text = `להיות עשיר${this.isMale ? '' : 'ה'} ועם כוח`;
    this.valuesDict.val4.text = `לשמור על המסורת`;
    this.valuesDict.val5.text = `לעזור לאחרים`;
    this.valuesDict.val6.text = `להנות מהחיים`;
    this.valuesDict.val7.text = `לעשות דברים מרגשים`;
    this.valuesDict.val8.text = `לגלות דברים חדשים`;
    this.valuesDict.val9.text = `להיות חבר${
      this.isMale ? '' : 'ה'
    } של ילדים מכל הסוגים`;

    this.playSound();
  }

  stepback() {
    this.calculating = true;
    this.audioService.pauseAudio();
    if (this.stage >= 2) {
      const valNum = this.orderedValues[this.valuesStages[this.stage - 2]]
        .valNum;
      this.valuesDict[`val${valNum}`].isStock = true;
      this.orderedValues[this.valuesStages[this.stage - 2]] = null;
      this.stage -= 1;
    }
    this.playSound();
    this.calculating = false;
  }

  valueClick(val: {
    valNum: number;
    text: string;
    imgLink: string;
    isStock: boolean;
  }) {
    if (!this.calculating) {
      this.calculating = true;
      this.stage += 1;
      val.isStock = false;
      this.orderedValues[this.valuesStages[this.stage - 2]] = {
        ...val,
      };
      this.playSound();
      if (this.stage >= 7) {
        this.audioService.getPlayerStatus().subscribe((res) => {
          if (res == 'ended') {
            for (let dictVal in this.valuesDict) {
              if (this.valuesDict[dictVal].isStock) {
                this.valuesDict[dictVal].isStock = false;
                this.stage += 1;
                this.orderedValues[this.valuesStages[this.stage - 2]] = {
                  ...this.valuesDict[dictVal],
                };
              }
            }
            this.calculating = false;
          }
        });
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
        this.title = this.isMale
          ? 'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחר 2 תמונות שמראות משהו שחשוב לך'
          : 'עכשיו הגענו לשורה השנייה. בטח יש עוד כמה דברים שחשובים לך. בחרי 2 תמונות שמראות משהו שחשוב לך';
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-3-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
        break;
      }
      case 5: {
        this.title = this.isMale
          ? 'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחר עוד 2 תמונות בשביל השורה הזאת'
          : 'עכשיו נגיע לשורה אחת לפני האחרונה. היא שייכת לדברים שלא ממש חשובים לך. בחרי עוד 2 תמונות בשביל השורה הזאת';
        this.audioService.setAudio(
          `../../assets/values-ranking/guidance_aud/inst-4-${
            this.isMale ? 'M' : 'F'
          }.wav`
        );
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

  getImgLink(num: number) {
    return `../../assets/values-ranking/values_img/val${num}.png`;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-rank-set2',
  templateUrl: './rank-set2.component.html',
  styleUrls: ['./rank-set2.component.scss'],
})
export class RankSet2Component implements OnInit {
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
    val10: {
      valNum: 10,
      text: '',
      imgLink: this.getImgLink(10),
      isStock: true,
    },
    val11: {
      valNum: 11,
      text: '',
      imgLink: this.getImgLink(11),
      isStock: true,
    },
    val12: {
      valNum: 12,
      text: '',
      imgLink: this.getImgLink(12),
      isStock: true,
    },
    val13: {
      valNum: 13,
      text: '',
      imgLink: this.getImgLink(13),
      isStock: true,
    },
    val14: {
      valNum: 14,
      text: '',
      imgLink: this.getImgLink(14),
      isStock: true,
    },
    val15: {
      valNum: 15,
      text: '',
      imgLink: this.getImgLink(15),
      isStock: true,
    },
    val16: {
      valNum: 16,
      text: '',
      imgLink: this.getImgLink(16),
      isStock: true,
    },
    val17: {
      valNum: 17,
      text: '',
      imgLink: this.getImgLink(17),
      isStock: true,
    },
    val18: {
      valNum: 18,
      text: '',
      imgLink: this.getImgLink(18),
      isStock: true,
    },
    val19: {
      valNum: 19,
      text: '',
      imgLink: this.getImgLink(19),
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
    this.valuesDict.val10.text = `להראות לכולם מה אני יכול${
      this.isMale ? '' : 'ה'
    }`;
    this.valuesDict.val11.text = `לעשות חיים`;
    this.valuesDict.val12.text = `להיות המנהיג${this.isMale ? '' : 'ה'}`;
    this.valuesDict.val13.text = `לצאת להרפתקאות`;
    this.valuesDict.val14.text = `להפעיל את הדמיון`;
    this.valuesDict.val15.text = `להיות כמו כולם`;
    this.valuesDict.val16.text = `לשמח אחרים`;
    this.valuesDict.val17.text = `לשמור על הטבע`;
    this.valuesDict.val18.text = `להיות מוג${this.isMale ? 'ן' : 'נת'} ובטוח${
      this.isMale ? '' : 'ה'
    }`;
    this.valuesDict.val19.text = `ללמוד על מה שהיה פעם מזמן`;

    this.playSound();
  }

  stepback() {
    this.calculating = true;
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credentials } from '../models';
import { AudioService } from '../shared/services/audio.service';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss'],
  animations: [
    trigger('fading', [
      state(
        'initial',
        style({
          opacity: 1,
        })
      ),
      state(
        'transparent',
        style({
          opacity: 0,
        })
      ),
      transition('initial=>transparent', animate('500ms')),
      transition('transparent=>initial', animate('0ms')),
    ]),
  ],
})
export class StickersComponent implements OnInit, OnDestroy {
  checkbox1: boolean;
  checkbox2: boolean;
  title: string;
  childImgLink: string;
  stage: number;
  isMale = true;
  $audioSubscription1 = new Subscription();
  $audioSubscription2 = new Subscription();
  showBoardsFlag = false;
  showSmallChildFlag = false;
  showMeFlag = false;
  finnishFlag = false;
  formFlag = false;
  calculatingFlag = false;
  myPointsList: string[];
  boards: BoardStickers[] = [
    {
      option1: {
        me: [],
        other: [],
      },
      option2: {
        me: [],
        other: [],
      },
    },
    {
      option1: {
        me: ['gold', 'gold'],
        other: [],
      },
      option2: {
        me: ['gold'],
        other: ['gold'],
      },
    },
    {
      option1: {
        me: ['gold'],
        other: ['gold'],
      },
      option2: {
        me: ['gold'],
        other: [],
      },
    },
    {
      option1: {
        me: [],
        other: ['gold'],
      },
      option2: {
        me: [],
        other: [],
      },
    },
    {
      option1: {
        me: ['gold'],
        other: [],
      },
      option2: {
        me: [],
        other: ['gold'],
      },
    },
    {
      option1: {
        me: ['gold', 'gold', 'gold'],
        other: [],
      },
      option2: {
        me: ['gold', 'gold'],
        other: ['gold', 'gold'],
      },
    },
    {
      option1: {
        me: [],
        other: ['gold', 'gold'],
      },
      option2: {
        me: ['gold'],
        other: [],
      },
    },
  ];
  curBoard: BoardStickers;
  finalData: {
    schoolID?: string;
    childID?: string;
    gender?: 'M' | 'F';
    board1?: number;
    board1Start?: Date;
    board1Time?: number;
    board2?: number;
    board2Start?: Date;
    board2Time?: number;
    board3?: number;
    board3Start?: Date;
    board3Time?: number;
    board4?: number;
    board4Start?: Date;
    board4Time?: number;
    board5?: number;
    board5Start?: Date;
    board5Time?: number;
    board6?: number;
    board6Start?: Date;
    board6Time?: number;
  } = {};
  currentState = 'transparent';
  fadingCoin: string;

  changeState() {
    this.currentState = 'initial';
    this.currentState = 'transparent';
  }

  /*
   * stages:
   * 0 - opening
   * 1 - board 1
   * 2 - board 2
   * 3 - board 3
   * 4 - board 4
   * 5 - board 5
   * 6 - board 6
   */

  constructor(private audioService: AudioService, private http: HttpClient) {
    this.curBoard = this.boards[0];
    this.myPointsList = [];
    this.calculatingFlag = true;
  }

  ngOnInit(): void {
    this.stage = 0;
    this.calculatingFlag = true;
  }

  ngOnDestroy(): void {
    this.$audioSubscription1.unsubscribe();
    this.$audioSubscription2.unsubscribe();
  }

  getCreds(creds: Credentials) {
    this.finalData.schoolID = creds.schoolID;
    this.finalData.childID = creds.childID;
    this.finalData.gender = creds.gender;
    this.formFlag = true;

    // init stage:
    this.isMale = this.finalData.gender === 'M';
    this.title = `עכשיו, נעשה פעילות עם נקודות. זו פעילות מאד נחמדה ופשוטה.
    <br>אני רוצה להראות לך את שני הדפים האלה. לכל דף יש חצי אחד כחול, וחצי אחד צהוב.`;
    this.childImgLink = `../../assets/stickers/child-${this.finalData.gender}.jpg`;
    this.audioService.setAudio(
      `../../assets/stickers/opening-${this.finalData.gender}.m4a`
    );

    this.$audioSubscription1 = this.audioService
      .getTimeElapsed()
      .subscribe((res) => {
        if (this.finalData.gender === 'M') {
          this.openingMale(res);
        } else {
          this.openingFemale(res);
        }
      });

    this.$audioSubscription2 = this.audioService
      .getPlayerStatus()
      .subscribe((res) => {
        if (res === 'ended') {
          this.$audioSubscription1.unsubscribe();
          this.nextStage();
        }
      });
  }

  async boardSelect(selected: number) {
    if (!this.calculatingFlag) {
      this.calculatingFlag = true;
      this.updateDataByBoardSelection(selected);
      let selectedBorad: {
        me: string[];
        other: string[];
      } = { me: [], other: [] };
      let otherBoard: {
        me: string[];
        other: string[];
      } = { me: [], other: [] };

      if (selected === 0) {
        selectedBorad = this.curBoard.option1;
        otherBoard = this.curBoard.option2;
        this.checkbox1 = true;
      } else {
        selectedBorad = this.curBoard.option2;
        otherBoard = this.curBoard.option1;
        this.checkbox2 = true;
      }

      otherBoard.me = [];
      otherBoard.other = [];

      let color: string;
      while (selectedBorad.me.length) {
        await this.delay(1000);
        this.audioService.setAudio(`../../assets/stickers/good.wav`);
        color = selectedBorad.me.pop();
        this.myPointsList.push(color);
      }

      while (selectedBorad.other.length) {
        await this.delay(1000);
        this.audioService.setAudio(`../../assets/stickers/bad.wav`);
        this.fadingCoin = selectedBorad.other.pop();
        this.currentState = 'initial';
        await this.delay(10);
        this.currentState = 'transparent';
      }
      await this.delay(1000);
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.nextStage();
    }
  }

  delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  updateDataByBoardSelection(selected: number) {
    const now = new Date();
    switch (this.stage) {
      case 1: {
        this.finalData.board1 = selected;
        this.finalData.board1Time =
          now.getTime() - this.finalData.board1Start?.getTime();
        break;
      }
      case 2: {
        this.finalData.board2 = selected;
        this.finalData.board2Time =
          now.getTime() - this.finalData.board2Start?.getTime();
        break;
      }
      case 3: {
        this.finalData.board3 = selected;
        this.finalData.board3Time =
          now.getTime() - this.finalData.board3Start?.getTime();
        break;
      }
      case 4: {
        this.finalData.board4 = selected;
        this.finalData.board4Time =
          now.getTime() - this.finalData.board4Start?.getTime();
        break;
      }
      case 5: {
        this.finalData.board5 = selected;
        this.finalData.board5Time =
          now.getTime() - this.finalData.board5Start?.getTime();
        break;
      }
      case 6: {
        this.finalData.board6 = selected;
        this.finalData.board6Time =
          now.getTime() - this.finalData.board6Start?.getTime();
        break;
      }
    }
  }

  async nextStage() {
    this.calculatingFlag = true;
    this.$audioSubscription2.unsubscribe();
    if (this.stage >= 6) {
      await this.delay(5000);
      this.calculateData();
      this.stage += 1;
      return 0;
    }
    this.stage += 1;
    this.playSound();
    this.curBoard = this.boards[this.stage];
    setTimeout(() => {
      this.$audioSubscription2 = this.audioService
        .getPlayerStatus()
        .subscribe((res) => {
          if (res === 'ended') {
            this.calculatingFlag = false;
          }
        });
    }, 1000);
  }

  openingMale(time: string) {
    switch (time) {
      case '00:08': {
        this.showBoardsFlag = true;
        break;
      }
      case '00:12': {
        this.title = `
        אני אשים נקודות על שני הדפים, ואתה תבחר דף אחד, איזה שאתה רוצה.
        <br>
        מה שבחצי הכחול של הדף שתבחר, זה נקודות בשבילך.
        `;
        break;
      }
      case '00:23': {
        this.showMeFlag = true;
        this.title = `
        מה שבחצי הצהוב זה בשביל הילד שאתה לא מכיר ולא פגשת אף פעם, הילד הזה
        `;
        break;
      }
      case '00:30': {
        this.showSmallChildFlag = true;
        this.title =
          'אתה רק צריך לבחור איזה דף אתה מעדיף, ואני אתן לך ולילד השני את הנקודות שבדף שתבחר';
        break;
      }
    }
  }

  openingFemale(time: string) {
    switch (time) {
      case '00:08': {
        this.showBoardsFlag = true;
        break;
      }
      case '00:12': {
        this.title = `
        אני אשים נקודות על שני הדפים, ואת תבחרי דף אחד, איזה שאת רוצה.
        <br>
        מה שבחצי הכחול של הדף שתבחרי, זה נקודות בשבילך.
        `;
        break;
      }
      case '00:23': {
        this.showMeFlag = true;
        this.title = `
        מה שבחצי הצהוב זה בשביל הילדה שאת לא מכירה ולא פגשת אף פעם, הילדה הזאת
        `;
        break;
      }
      case '00:29': {
        this.showSmallChildFlag = true;
        break;
      }
      case '00:30': {
        this.title =
          'את רק צריכה לבחור איזה דף את מעדיפה, ואני אתן לך ולילדה השניה את הנקודות שבדף שתבחרי';
        break;
      }
    }
  }

  playSound() {
    switch (this.stage) {
      case 1: {
        this.title = this.isMale
          ? 'מה אתה בוחר, שתיים לך וכלום לילד האחר, או אחת לך ואחת לילד האחר?'
          : 'מה את בוחרת, שתיים לך וכלום לילדה האחרת, או אחת לך ואחת לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker1-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board1Start = new Date();
        return 0;
      }
      case 2: {
        this.title = this.isMale
          ? 'מה אתה בוחר, אחת לך ואחת לילד האחר, או אחת לך וכלום לילד האחר?'
          : 'מה את בוחרת, אחת לך ואחת לילדה האחרת, או אחת לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker2-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board2Start = new Date();
        return 0;
      }
      case 3: {
        this.title = this.isMale
          ? 'מה אתה בוחר, כלום לך ואחת לילד האחר, או כלום לך וכלום לילד האחר?'
          : 'מה את בוחרת, כלום לך ואחת לילדה האחרת, או כלום לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker3-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board3Start = new Date();
        return 0;
      }
      case 4: {
        this.title = this.isMale
          ? 'מה אתה בוחר, אחת לך וכלום לילד האחר, או כלום לך ואחת לילד האחר?'
          : 'מה את בוחרת, אחת לך וכלום לילדה האחרת, או כלום לך ואחת לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker4-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board4Start = new Date();
        return 0;
      }
      case 5: {
        this.title = this.isMale
          ? 'מה אתה בוחר, שלוש לך וכלום לילד האחר, או שתיים לך ושתיים לילד האחר?'
          : 'מה את בוחרת, שלוש לך וכלום לילדה האחרת, או שתיים לך ושתיים לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker5-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board5Start = new Date();
        return 0;
      }
      case 6: {
        this.title = this.isMale
          ? 'מה אתה בוחר, כלום לך ושתיים לילד האחר, או אחת לך וכלום לילד האחר?'
          : 'מה את בוחרת, כלום לך ושתיים לילדה האחרת, או אחת לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker6-${this.isMale ? 'M' : 'F'}.m4a`
        );
        this.finalData.board6Start = new Date();
        return 0;
      }
      default: {
        return 0;
      }
    }
  }

  calculateData() {
    const reqBody = {
      query: `mutation insertData {
        insert_stickers_one(
          object: {
            school_id: "${this.finalData.schoolID}",
            child_id: "${this.finalData.childID}",
            gender: "${this.finalData.gender}",
            board_1: ${this.finalData.board1},
            board_1_time: ${this.finalData.board1Time},
            board_2: ${this.finalData.board2},
            board_2_time: ${this.finalData.board2Time},
            board_3: ${this.finalData.board3},
            board_3_time: ${this.finalData.board3Time},
            board_4: ${this.finalData.board4},
            board_4_time: ${this.finalData.board4Time},
            board_5: ${this.finalData.board5},
            board_5_time: ${this.finalData.board5Time},
            board_6: ${this.finalData.board6},
            board_6_time: ${this.finalData.board6Time},
          }
        ) {
          id,
          init_time
        }
      }`,
    };
    const headers = { 'X-Hasura-Role': 'app' };
    console.log('Data summary:', this.finalData);
    this.http
      .post<any>('https://research-tasks.hasura.app/v1/graphql', reqBody, {
        headers,
      })
      .subscribe({
        next: (data) => {
          if (!!data.data?.insert_stickers_one) {
            const res = data.data.insert_stickers_one;
            console.log(`Input saved under ID ${res.id} on ${res.init_time}`);
          } else {
            console.error('Error saving task data!');
            if (!!data.data?.errors) {
              console.error(data.data.errors);
            }
          }
        },
        error: (e) => {
          console.error('Error saving task data!');
          console.error(e);
        },
      });
  }
}

interface BoardStickers {
  option1: {
    me: string[];
    other: string[];
  };
  option2: {
    me: string[];
    other: string[];
  };
}

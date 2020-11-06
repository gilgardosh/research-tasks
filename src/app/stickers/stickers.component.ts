import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { credentials } from '../models';
import { AudioService } from '../shared/services/audio.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss'],
})
export class StickersComponent implements OnInit {
  title: string;
  childImgLink: string;
  stage: number;
  isMale: boolean = true;
  $audioSubscription1 = new Subscription();
  $audioSubscription2 = new Subscription();
  showBoardsFlag: boolean = false;
  showLargeChildFlag: boolean = false;
  showSmallChildFlag: boolean = false;
  finnishFlag: boolean = false;
  formFlag: boolean = false;
  calculatingFlag: boolean;
  myPointsList: number[];
  myPoints: number;
  boards: boardStickers[] = [
    {
      option1: {
        me: 0,
        other: 0,
      },
      option2: {
        me: 0,
        other: 0,
      },
    },
    {
      option1: {
        me: 2,
        other: 0,
      },
      option2: {
        me: 1,
        other: 1,
      },
    },
    {
      option1: {
        me: 1,
        other: 1,
      },
      option2: {
        me: 1,
        other: 0,
      },
    },
    {
      option1: {
        me: 0,
        other: 1,
      },
      option2: {
        me: 0,
        other: 0,
      },
    },
    {
      option1: {
        me: 1,
        other: 0,
      },
      option2: {
        me: 0,
        other: 1,
      },
    },
    {
      option1: {
        me: 3,
        other: 0,
      },
      option2: {
        me: 2,
        other: 2,
      },
    },
    {
      option1: {
        me: 0,
        other: 2,
      },
      option2: {
        me: 1,
        other: 0,
      },
    },
  ];
  curBoard: boardStickers;

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

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {
    this.curBoard = this.boards[0];
    this.myPointsList = [];
    this.myPoints = 0;
  }

  ngOnInit(): void {
    this.stage = 0;
    this.calculatingFlag = true;
  }

  ngOnDestroy(): void {
    this.$audioSubscription1.unsubscribe();
    this.$audioSubscription2.unsubscribe();
  }

  getCreds(creds: credentials) {
    this.dataService.schoolID = creds.schoolID;
    this.dataService.childID = creds.childID;
    this.dataService.setGender(creds.gender);
    this.formFlag = true;

    // init stage:
    this.isMale = this.dataService.gender === 'M';
    this.title = `עכשיו, נעשה פעילות עם נקודות. זו פעילות מאד נחמדה ופשוטה.
    <br>אני רוצה להראות לך את שני הדפים האלה. לכל דף יש חצי אחד כחול, וחצי אחד צהוב.`;
    this.childImgLink = `../../assets/stickers/child-${this.dataService.gender}.jpg`;
    this.audioService.setAudio(
      `../../assets/stickers/opening-${this.dataService.gender}.m4a`
    );

    this.$audioSubscription1 = this.audioService
      .getTimeElapsed()
      .subscribe((res) => {
        if (this.dataService.gender === 'M') {
          this.openingMale(res);
        } else {
          this.openingFemale(res);
        }
      });

    this.$audioSubscription2 = this.audioService
      .getPlayerStatus()
      .subscribe((res) => {
        if (res == 'ended') {
          this.$audioSubscription1.unsubscribe();
          this.showLargeChildFlag = false;
          this.showSmallChildFlag = true;
          this.nextStage();
        }
      });
  }

  boardSelect(points: number) {
    if (!this.calculatingFlag) {
      this.myPointsList.push(points);
      this.nextStage();
    }
  }

  nextStage() {
    this.calculatingFlag = true;
    this.$audioSubscription2.unsubscribe();
    this.stage += 1;
    if (this.stage >= 7) {
      return 0;
    }
    this.calculatePoints();
    this.playSound();
    this.curBoard = this.boards[this.stage];
    setTimeout(() => {
      this.$audioSubscription2 = this.audioService
        .getPlayerStatus()
        .subscribe((res) => {
          if (res == 'ended') {
            this.calculatingFlag = false;
          }
        });
    }, 1000);
  }

  prevStage() {
    this.calculatingFlag = true;
    this.$audioSubscription2.unsubscribe();
    if (this.stage >= 2) {
      this.stage -= 1;
      this.curBoard = this.boards[this.stage];
    }
    this.myPointsList.length = this.stage - 1;
    this.calculatePoints();
    this.playSound();
    setTimeout(() => {
      this.$audioSubscription2 = this.audioService
        .getPlayerStatus()
        .subscribe((res) => {
          if (res == 'ended') {
            this.calculatingFlag = false;
          }
        });
    }, 1000);
  }

  async calculatePoints() {
    let newPoints = 0;
    for (let x of this.myPointsList) {
      newPoints += x;
    }
    if (this.myPoints > newPoints) {
      this.myPoints = newPoints;
    } else if (this.myPoints < newPoints) {
      this.myPoints = newPoints;
    }
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
        מה שבחצי הכחול של הדף שתבחר, זה מדבקות בשבילך.
        `;
        break;
      }
      case '00:23': {
        this.title = `
        מה שבחצי הצהוב זה בשביל הילד שאתה לא מכיר ולא פגשת אף פעם, הילד הזה
        `;
        break;
      }
      case '00:30': {
        this.showLargeChildFlag = true;
        this.title =
          'אתה רק צריך לבחור איזה דף אתה מעדיף, ואני אתן לך ולילד השני את המדבקות שבדף שתבחר';
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
      case '00:13': {
        this.title = `
        אני אשים נקודות על שני הדפים, ואת תבחרי דף אחד, איזה שאת רוצה.
        <br>
        מה שבחצי הכחול של הדף שתבחרי, זה מדבקות בשבילך.
        `;
        break;
      }
      case '00:24': {
        this.title = `
        מה שבחצי הצהוב זה בשביל הילדה שאת לא מכירה ולא פגשת אף פעם, הילדה הזאת
        `;
        break;
      }
      case '00:30': {
        this.showLargeChildFlag = true;
        break;
      }
      case '00:31': {
        this.title =
          'את רק צריכה לבחור איזה דף את מעדיפה, ואני אתן לך ולילדה השניה את המדבקות שבדף שתבחרי';
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
        return 0;
      }
      case 2: {
        this.title = this.isMale
          ? 'מה אתה בוחר, אחת לך ואחת לילד האחר, או אחת לך וכלום לילד האחר?'
          : 'מה את בוחרת, אחת לך ואחת לילדה האחרת, או אחת לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker2-${this.isMale ? 'M' : 'F'}.m4a`
        );
        return 0;
      }
      case 3: {
        this.title = this.isMale
          ? 'מה אתה בוחר, כלום לך ואחת לילד האחר, או כלום לך וכלום לילד האחר?'
          : 'מה את בוחרת, כלום לך ואחת לילדה האחרת, או כלום לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker3-${this.isMale ? 'M' : 'F'}.m4a`
        );
      }
      case 4: {
        this.title = this.isMale
          ? 'מה אתה בוחר, אחת לך וכלום לילד האחר, או כלום לך ואחת לילד האחר?'
          : 'מה את בוחרת, אחת לך וכלום לילדה האחרת, או כלום לך ואחת לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker4-${this.isMale ? 'M' : 'F'}.m4a`
        );
        return 0;
      }
      case 5: {
        this.title = this.isMale
          ? 'מה אתה בוחר, שלוש לך וכלום לילד האחר, או שתיים לך ושתיים לילד האחר?'
          : 'מה את בוחרת, שלוש לך וכלום לילדה האחרת, או שתיים לך ושתיים לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker5-${this.isMale ? 'M' : 'F'}.m4a`
        );
      }
      case 6: {
        this.title = this.isMale
          ? 'מה אתה בוחר, כלום לך ושתיים לילד האחר, או אחת לך וכלום לילד האחר?'
          : 'מה את בוחרת, כלום לך ושתיים לילדה האחרת, או אחת לך וכלום לילדה האחרת?';
        this.audioService.setAudio(
          `../../assets/stickers/sticker6-${this.isMale ? 'M' : 'F'}.m4a`
        );
        return 0;
      }
      default: {
        return 0;
      }
    }
  }
}

interface boardStickers {
  option1: {
    me: number;
    other: number;
  };
  option2: {
    me: number;
    other: number;
  };
}

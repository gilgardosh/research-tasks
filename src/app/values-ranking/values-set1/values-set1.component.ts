import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';
import { Pbvs, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-values-set1',
  templateUrl: './values-set1.component.html',
  styleUrls: ['./values-set1.component.scss'],
  providers: [AudioService],
})
export class ValuesSet1Component implements OnInit {
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  stage = 1;
  /**
   * stages:
   * 1 - opening
   * 2 - val3
   * 3 - val2
   * 4 - val6
   * 5 - val7
   * 6 - val8
   * 7 - val1
   * 8 - val0
   * 9 - val4
   * 10 - val5
   * 11 - val9
   */

  constructor(
    private audioService: AudioService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.stage = 1;
    this.subtitle = `עכשיו אנחנו נצא למסע דמיוני -<br>
    מסע בדברים החשובים לך בחיים,<br>
    במטרות שלך ואיך תרצ${
      this.dataService.gender === 'M' ? 'ה' : 'י'
    } לחיות בעתיד`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/opening1-${this.dataService.gender}.wav`
    );

    this.audioService.getTimeElapsed().subscribe((res) => {
      if (this.dataService.gender === 'M') {
        this.openingMale(res);
      } else {
        this.openingFemale(res);
      }
    });

    this.audioService.getPlayerStatus().subscribe((res) => {
      if (res === 'ended') {
        this.stage += 1;
        this.introduceValues();
      }
    });
  }

  introduceValues() {
    let curVal: Pbvs;
    switch (this.stage) {
      case 2: {
        curVal = this.dataService.pbvs1;
        break;
      }
      case 3: {
        curVal = this.dataService.pbvs2;
        break;
      }
      case 4: {
        curVal = this.dataService.pbvs3;
        break;
      }
      case 5: {
        curVal = this.dataService.pbvs4;
        break;
      }
      case 6: {
        curVal = this.dataService.pbvs5;
        break;
      }
      case 7: {
        curVal = this.dataService.pbvs6;
        break;
      }
      case 8: {
        curVal = this.dataService.pbvs7;
        break;
      }
      case 9: {
        curVal = this.dataService.pbvs8;
        break;
      }
      case 10: {
        curVal = this.dataService.pbvs9;
        break;
      }
      case 11: {
        curVal = this.dataService.pbvs10;
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

  openingMale(time: string) {
    switch (time) {
      case '00:10': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תאר לך שהילד הזה, עם הכובע המפוספס והבגד האפור, הוא אתה';
        break;
      }
      case '00:16': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה.';
        break;
      }
      case '00:19': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:23': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:25': {
        this.subtitle = 'פשוט נסה לדמיין שזה אתה';
        break;
      }
      case '00:28': {
        this.subtitle = 'עכשיו, חשוב על עצמך. ';
        break;
      }
      case '00:31': {
        this.subtitle = 'איך אתה רוצה להיות כשתהיה גדול?';
        break;
      }
      case '00:34': {
        this.subtitle = 'איזה מטרות אתה רוצה להשיג? ';
        break;
      }
      case '00:37': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מני דברים שיכול להיות שאתה רוצה להיות';
        break;
      }
      case '00:43': {
        this.subtitle = 'תסתכל על התמונות, אתה תוכל למצוא בהן את הילד הזה';
        break;
      }
      case '00:47': {
        this.subtitle = 'בוא נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:51': {
        this.subtitle =
          'ואתה כבר יכול להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }

  openingFemale(time: string) {
    switch (time) {
      case '00:10': {
        this.imgLink = '../../assets/values-ranking/values_img/kid.png';
        this.subtitle =
          'תארי לך שהילדה הזו, עם הכובע המפוספס והבגד האפור, היא את';
        break;
      }
      case '00:16': {
        this.subtitle = 'יכול להיות שקשה לך לדמיין את זה. ';
        break;
      }
      case '00:19': {
        this.subtitle = 'אולי בכלל אין לך כובע כזה או בגדים אפורים';
        break;
      }
      case '00:23': {
        this.subtitle = 'אבל זה לא משנה';
        break;
      }
      case '00:25': {
        this.subtitle = 'פשוט נסי לדמיין שזו את';
        break;
      }
      case '00:27': {
        this.subtitle = 'עכשיו, חשבי על עצמך ';
        break;
      }
      case '00:30': {
        this.subtitle = 'איך את רוצה להיות כשתהיי גדולה?';
        break;
      }
      case '00:33': {
        this.subtitle = 'איזה מטרות את רוצה להשיג? ';
        break;
      }
      case '00:35': {
        this.subtitle =
          'עכשיו נראה תמונות של כל מני דברים שיכול להיות שאת רוצה להיות';
        break;
      }
      case '00:41': {
        this.subtitle = 'תסתכלי על התמונות, את תוכלי למצוא בהן את הילדה הזו';
        break;
      }
      case '00:46': {
        this.subtitle = 'בואי נעבור על התמונות אחת - אחת';
        break;
      }
      case '00:49': {
        this.subtitle =
          'ואת כבר יכולה להתחיל לחשוב מה יותר חשוב ומה פחות חשוב לך בחיים';
        break;
      }
    }
  }
}

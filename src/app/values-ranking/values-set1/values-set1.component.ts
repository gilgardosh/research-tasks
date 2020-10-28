import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-values-set1',
  templateUrl: './values-set1.component.html',
  styleUrls: ['./values-set1.component.scss'],
})
export class ValuesSet1Component implements OnInit {
  @Input() isMale: boolean;
  @Output() openingEnded: EventEmitter<boolean> = new EventEmitter<boolean>();
  subtitle: string;
  imgLink: string = null;
  stage: number = 1;
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

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.subtitle = this.isMale
      ? 'עכשיו אנחנו נצא למסע דימיוני - מסע בדברים החשובים לך בחיים, במטרות שלך ואיך תרצה לחיות בעתיד'
      : 'עכשיו אנחנו נצא למסע דימיוני - מסע בדברים החשובים לך בחיים, במטרות שלך ואיך תרצי לחיות בעתיד';
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/01opening-${
        this.isMale ? 'M' : 'F'
      }.wav`
    );

    this.audioService.getTimeElapsed().subscribe((res) => {
      if (this.isMale) {
        this.openingMale(res);
      } else {
        this.openingFemale(res);
      }
    });

    this.audioService.getPlayerStatus().subscribe((res) => {
      if (res == 'ended') {
        this.stage += 1;
        this.nextStage();
      }
    });
  }

  nextStage() {
    let valNum: number;
    let audioString: string;
    switch (this.stage) {
      case 2: {
        valNum = 3;
        this.subtitle = this.isMale
          ? 'להיות עשיר ועם כוח'
          : 'להיות עשירה ועם כוח';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 3: {
        valNum = 2;
        this.subtitle = this.isMale ? 'להיות הכי טוב' : 'להיות הכי טובה';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 4: {
        valNum = 6;
        this.subtitle = 'להנות מהחיים';
        audioString = `${valNum}`;
        break;
      }
      case 5: {
        valNum = 7;
        this.subtitle = 'לעשות דברים מרגשים';
        audioString = `${valNum}`;
        break;
      }
      case 6: {
        valNum = 8;
        this.subtitle = 'לגלות דברים חדשים';
        audioString = `${valNum}`;
        break;
      }
      case 7: {
        valNum = 1;
        this.subtitle = 'לשמור על הבטיחות';
        audioString = `${valNum}`;
        break;
      }
      case 8: {
        valNum = 0;
        this.subtitle = 'לשמור על החוקים';
        audioString = `${valNum}`;
        break;
      }
      case 9: {
        valNum = 4;
        this.subtitle = 'לשמור על המסורת';
        audioString = `${valNum}`;
        break;
      }
      case 10: {
        valNum = 5;
        this.subtitle = 'לעזור לאחרים';
        audioString = `${valNum}`;
        break;
      }
      case 11: {
        valNum = 9;
        this.subtitle = this.isMale
          ? 'להיות חבר של ילדים מכל הסוגים'
          : 'להיות חברה של ילדים מכל הסוגים';
        audioString = `${valNum}-${this.isMale ? 'M' : 'F'}`;
        break;
      }
      case 12: {
        this.openingEnded.emit(true);
        return 0;
      }
    }
    this.imgLink = `../../assets/values-ranking/values_img/val${valNum}.png`;
    this.audioService.setAudio(
      `../../assets/values-ranking/values_aud/val${audioString}.wav`
    );
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

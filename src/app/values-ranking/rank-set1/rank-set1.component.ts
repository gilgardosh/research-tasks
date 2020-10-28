import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rank-set1',
  templateUrl: './rank-set1.component.html',
  styleUrls: ['./rank-set1.component.scss'],
})
export class RankSet1Component implements OnInit {
  @Input() isMale: boolean;
  @Output() getRanking: EventEmitter<any> = new EventEmitter<any>();
  title: string;

  constructor() {}

  valuesDict = {
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

  ngOnInit(): void {
    this.title = 'כותרת זמנית';
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
  }

  stepback() {}

  getImgLink(num: number) {
    return `../../assets/values-ranking/values_img/val${num}.png`;
  }
}

export class DataService {
  dataSavedFlag: boolean = false;
  schoolID: string;
  childID: string;
  gender: 'M' | 'F' = 'M';
  pbvs1: pbvs = {
    valNum: 3,
    text: '',
    imgLink: 'val3.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs2: pbvs = {
    valNum: 2,
    text: '',
    imgLink: 'val2.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs3: pbvs = {
    valNum: 6,
    text: 'להנות מהחיים',
    imgLink: 'val6.png',
    audioLink: 'val6.wav',
    rank: null,
    isStock: true,
  };
  pbvs4: pbvs = {
    valNum: 7,
    text: 'לעשות דברים מרגשים',
    imgLink: 'val7.png',
    audioLink: 'val7.wav',
    rank: null,
    isStock: true,
  };
  pbvs5: pbvs = {
    valNum: 8,
    text: 'לגלות דברים חדשים',
    imgLink: 'val8.png',
    audioLink: 'val8.wav',
    rank: null,
    isStock: true,
  };
  pbvs6: pbvs = {
    valNum: 1,
    text: 'לשמור על הבטיחות',
    imgLink: 'val1.png',
    audioLink: 'val1.wav',
    rank: null,
    isStock: true,
  };
  pbvs7: pbvs = {
    valNum: 0,
    text: 'לשמור על החוקים',
    imgLink: 'val0.png',
    audioLink: 'val0.wav',
    rank: null,
    isStock: true,
  };
  pbvs8: pbvs = {
    valNum: 4,
    text: 'לשמור על המסורת',
    imgLink: 'val4.png',
    audioLink: 'val4.wav',
    rank: null,
    isStock: true,
  };
  pbvs9: pbvs = {
    valNum: 5,
    text: 'לעזור לאחרים',
    imgLink: 'val5.png',
    audioLink: 'val5.wav',
    rank: null,
    isStock: true,
  };
  pbvs10: pbvs = {
    valNum: 9,
    text: '',
    imgLink: 'val9.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs11: pbvs = {
    valNum: 12,
    text: '',
    imgLink: 'val12.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs12: pbvs = {
    valNum: 10,
    text: '',
    imgLink: 'val10.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs13: pbvs = {
    valNum: 11,
    text: 'לעשות חיים',
    imgLink: 'val11.png',
    audioLink: 'val11.wav',
    rank: null,
    isStock: true,
  };
  pbvs14: pbvs = {
    valNum: 13,
    text: 'לצאת להרפתקאות',
    imgLink: 'val13.png',
    audioLink: 'val13.wav',
    rank: null,
    isStock: true,
  };
  pbvs15: pbvs = {
    valNum: 14,
    text: 'להפעיל את הדמיון',
    imgLink: 'val14.png',
    audioLink: 'val14.wav',
    rank: null,
    isStock: true,
  };
  pbvs16: pbvs = {
    valNum: 18,
    text: '',
    imgLink: 'val18.png',
    audioLink: '',
    rank: null,
    isStock: true,
  };
  pbvs17: pbvs = {
    valNum: 15,
    text: 'להיות כמו כולם',
    imgLink: 'val15.png',
    audioLink: 'val15.wav',
    rank: null,
    isStock: true,
  };
  pbvs18: pbvs = {
    valNum: 19,
    text: 'ללמוד על מה שהיה פעם מזמן',
    imgLink: 'val19.png',
    audioLink: 'val19.wav',
    rank: null,
    isStock: true,
  };
  pbvs19: pbvs = {
    valNum: 16,
    text: 'לשמח אחרים',
    imgLink: 'val16.png',
    audioLink: 'val16.wav',
    rank: null,
    isStock: true,
  };
  pbvs20: pbvs = {
    valNum: 17,
    text: 'לשמור על הטבע',
    imgLink: 'val17.png',
    audioLink: 'val17.wav',
    rank: null,
    isStock: true,
  };

  constructor() {}

  setGender(gender: 'M' | 'F') {
    this.gender = gender;
    this.pbvs1.text =
      gender === 'M' ? 'להיות עשיר ועם כוח' : 'להיות עשירה ועם כוח';
    this.pbvs1.audioLink = `val3-${gender}.wav`;
    this.pbvs2.text = gender === 'M' ? 'להיות הכי טוב' : 'להיות הכי טובה';
    this.pbvs2.audioLink = `val2-${gender}.wav`;
    this.pbvs10.text =
      gender === 'M'
        ? 'להיות חבר של ילדים מכל הסוגים'
        : 'להיות חברה של ילדים מכל הסוגים';
    this.pbvs10.audioLink = `val9-${gender}.wav`;
    this.pbvs11.text = gender === 'M' ? 'להיות המנהיג' : 'להיות המנהיגה';
    this.pbvs11.audioLink = `val12-${gender}.wav`;
    this.pbvs12.text =
      gender === 'M' ? 'להראות לכולם מה אני יכול' : 'להראות לכולם מה אני יכולה';
    this.pbvs12.audioLink = `val10-${gender}.wav`;
    this.pbvs16.text =
      gender === 'M' ? 'להיות מוגן ובטוח' : 'להיות מוגנת ובטוחה';
    this.pbvs16.audioLink = `val18-${gender}.wav`;
  }
}

export interface pbvs {
  valNum: number;
  text: string;
  imgLink: string;
  audioLink: string;
  rank: number;
  isStock: boolean;
}

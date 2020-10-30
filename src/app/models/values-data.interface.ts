export class valuesRankingData {
  schoolID: string;
  childID: string;
  values: { [U: string]: pbvs } = {
    pbvs1: {
      valNum: 3,
      text: '',
      imgLink: 'val3.png',
      audioLink: '',
      rank: null,
    },
    pbvs2: {
      valNum: 2,
      text: '',
      imgLink: 'val2.png',
      audioLink: '',
      rank: null,
    },
    pbvs3: {
      valNum: 6,
      text: 'להנות מהחיים',
      imgLink: 'val6.png',
      audioLink: 'val6.wav',
      rank: null,
    },
    pbvs4: {
      valNum: 7,
      text: 'לעשות דברים מרגשים',
      imgLink: 'val7.png',
      audioLink: 'val7.wav',
      rank: null,
    },
    pbvs5: {
      valNum: 8,
      text: 'לגלות דברים חדשים',
      imgLink: 'val8.png',
      audioLink: 'val8.wav',
      rank: null,
    },
    pbvs6: {
      valNum: 1,
      text: 'לשמור על הבטיחות',
      imgLink: 'val1.png',
      audioLink: 'val1.wav',
      rank: null,
    },
    pbvs7: {
      valNum: 0,
      text: 'לשמור על החוקים',
      imgLink: 'val0.png',
      audioLink: 'val0.wav',
      rank: null,
    },
    pbvs8: {
      valNum: 4,
      text: 'לשמור על המסורת',
      imgLink: 'val4.png',
      audioLink: 'val4.wav',
      rank: null,
    },
    pbvs9: {
      valNum: 5,
      text: 'לעזור לאחרים',
      imgLink: 'val5.png',
      audioLink: 'val5.wav',
      rank: null,
    },
    pbvs10: {
      valNum: 9,
      text: '',
      imgLink: 'val9.png',
      audioLink: '',
      rank: null,
    },
    pbvs11: {
      valNum: 11,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs12: {
      valNum: 12,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs13: {
      valNum: 13,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs14: {
      valNum: 14,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs15: {
      valNum: 15,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs16: {
      valNum: 16,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs17: {
      valNum: 17,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs18: {
      valNum: 18,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs19: {
      valNum: 19,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
    pbvs20: {
      valNum: 20,
      text: '',
      imgLink: '',
      audioLink: '',
      rank: null,
    },
  };
  constructor() {}

  setCredentials(schoolID: string, childID: string, gender: 'M' | 'F') {
    this.schoolID = schoolID;
    this.childID = childID;
    this.setGender(gender);
  }

  setGender(gender: 'M' | 'F') {
    this.values.pbvs1.text =
      gender === 'M' ? 'להיות עשיר ועם כוח' : 'להיות עשירה ועם כוח';
    this.values.pbvs2.text =
      gender === 'M' ? 'להיות הכי טוב' : 'להיות הכי טובה';
  }
}

export interface pbvs {
  valNum: number;
  text: string;
  imgLink: string;
  audioLink: string;
  rank: number;
}

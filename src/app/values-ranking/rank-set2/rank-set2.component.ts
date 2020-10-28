import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rank-set2',
  templateUrl: './rank-set2.component.html',
  styleUrls: ['./rank-set2.component.scss'],
})
export class RankSet2Component implements OnInit {
  @Input() isMale: boolean;
  @Output() getRanking: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}

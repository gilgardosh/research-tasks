import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rank-set1',
  templateUrl: './rank-set1.component.html',
  styleUrls: ['./rank-set1.component.scss'],
})
export class RankSet1Component implements OnInit {
  @Input() isMale: boolean;
  @Output() getRanking: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}

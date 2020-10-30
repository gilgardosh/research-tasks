import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'src/app/shared/services/audio.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() data: any;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.setAudio(
      `../../assets/values-ranking/guidance_aud/end-${
        this.data.creds.gender === 'male' ? 'M' : 'F'
      }.wav`
    );
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StickersComponent } from './stickers/stickers.component';
import { ValuesRankingComponent } from './values-ranking/values-ranking.component';
import { MenuComponent } from './menu/menu.component';
import { ValuesSet1Component } from './values-ranking/values-set1/values-set1.component';
import { RankSet1Component } from './values-ranking/rank-set1/rank-set1.component';
import { ValuesSet2Component } from './values-ranking/values-set2/values-set2.component';
import { RankSet2Component } from './values-ranking/rank-set2/rank-set2.component';
import { SummaryComponent } from './values-ranking/summary/summary.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StickersComponent,
    ValuesRankingComponent,
    MenuComponent,
    ValuesSet1Component,
    RankSet1Component,
    ValuesSet2Component,
    RankSet2Component,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

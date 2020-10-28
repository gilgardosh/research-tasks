import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { StickersComponent } from './stickers/stickers.component';
import { ValuesRankingComponent } from './values-ranking/values-ranking.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'values-ranking',
    component: ValuesRankingComponent,
  },
  {
    path: 'stickers',
    component: StickersComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

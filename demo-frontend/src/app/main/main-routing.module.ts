import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from '../auth/auth.guard';
import { MenushomeComponent } from './menus/menushome/menushome.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainHomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['MENUS'],
    },
  },
  {
    path: 'menus',
    component: MenushomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['MENUS'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

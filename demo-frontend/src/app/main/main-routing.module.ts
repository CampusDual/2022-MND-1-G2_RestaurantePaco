import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from '../auth/auth.guard';
import { MenushomeComponent } from './menus/menushome/menushome.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainHomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['CONTACTS', 'MENUS'],
  
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
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['CONTACTS'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

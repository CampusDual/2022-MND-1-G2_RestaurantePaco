import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusLayoutComponent } from './menus-layout.component';
import { MenushomeComponent } from './menushome/menushome.component';

const routes: Routes = [
  {
    path: '',
    component: MenusLayoutComponent,
    children: [
      { path: "", component: MenushomeComponent },
      // { path: 'add', component: EditContactComponent },
      // { path: 'edit/:id', component: EditContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }

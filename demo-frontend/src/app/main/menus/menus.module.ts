import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenushomeComponent } from './menushome/menushome.component';


@NgModule({
  declarations: [
    MenushomeComponent
  ],
  imports: [
    CommonModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }

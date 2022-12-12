import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenushomeComponent } from './menushome/menushome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutingModule } from '../contacts/contacts-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { MenusLayoutComponent } from './menus-layout.component';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MenusRoutingModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatTableModule,
      MatCardModule,
      MatCheckboxModule,
      TranslateModule,
  ],
  declarations: [
     MenushomeComponent,
     MenusLayoutComponent
  ]
})
export class MenusModule { }

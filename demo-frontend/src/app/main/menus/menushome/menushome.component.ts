import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, fromEvent, merge, Observable, Observer, tap } from 'rxjs';
import { MenusDataSource } from 'src/app/model/datasource/menus.datasource';
import { Menus } from 'src/app/model/menus';
import { AnyField, AnyPageFilter, SortFilter } from 'src/app/model/rest/filter';
import { MenusService } from 'src/app/services/menus.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-menushome',
  templateUrl: './menushome.component.html',
  styleUrls: ['./menushome.component.scss']
})
export class MenushomeComponent implements OnInit {
  dataSource: MenusDataSource
  displayedColumns = [ 
    'select',
    'idMenu',
    'nombreMenu',
    'plato1',
    'plato2',
    'postre',
    'precio',
  ]
  fields = ['select',
  'idMenu',
  'nombreMenu',
  'plato1',
  'plato2',
  'postre',
  'precio',
]
selection = new SelectionModel<Menus>(true, []);
  error = false;
  highlightedRow: Menus;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private menusService: MenusService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog
  ) {}


  ngOnInit() {
    this.dataSource = new MenusDataSource(this.menusService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'idMenu'
    );
    this.dataSource.getMenus(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadMenusPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.selection.clear();
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadMenusPage();
        })
      )
      .subscribe();
  }

  loadMenusPage() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      this.input.nativeElement.value,
      this.fields.map((field) => new AnyField(field)),
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    pageFilter.order = [];
    pageFilter.order.push(
      new SortFilter(this.sort.active, this.sort.direction.toString())
    );
    this.dataSource.getMenus(pageFilter);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.menusSubject.value.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.menusSubject.value.forEach((row) =>
          this.selection.select(row)
        );
  }
 

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-element-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
        return new Observable((observer: Observer<boolean>) =>
          observer.next(true)
        );
      } else {
        return new Observable((observer: Observer<boolean>) =>
          observer.next(false)
        );
      }
    });
  }

  delete() {
    const menus = this.selection.selected[0];
    this.selection.deselect(menus);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.menusService.deleteMenus(menus.idMenu).subscribe((response) => {
        console.log(response)
        if (response.responseCode !== 'OK') {
           this.error = true;
         } else {
          this.loadMenusPage();
         }
      });
    } else {
      this.menusService.deleteMenus(menus.idMenu).subscribe((response) => {
        console.log(response);
        if (response.responseCode !== 'OK') {
           this.error = true;
        }
        this.delete();
      });
    }
  }

  onAdd() {
    this.router.navigate(['/menus/add']);
  }

  onEdit(row: Menus) {
    this.highlightedRow = row;
    this.router.navigate(['/menus/edit/' + row.idMenu]);
  }
}

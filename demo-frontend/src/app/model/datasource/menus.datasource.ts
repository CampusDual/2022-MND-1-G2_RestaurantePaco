import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contact.service';
import {MenusService} from 'src/app/services/menus.service';
import { Contact } from '../contact';
import { AnyPageFilter } from '../rest/filter';
import { Menus} from '../menus'

export class MenusDataSource extends DataSource<Menus> {
    menusSubject = new BehaviorSubject<Menus[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;
  
    constructor(private menusService: MenusService) {
      super();
    }

    getMenus(pageFilter: AnyPageFilter) {
        this.menusSubject.next([]);
        this.loadingSubject.next(true);
        this.menusService.getMenus(pageFilter).pipe(
          finalize(() => this.loadingSubject.next(false))
        ).subscribe(
          response => {
            this.totalElements = response.totalElements;
            this.menusSubject.next(response.data);
          }
        );
      }
      connect(): BehaviorSubject<Menus[]> {
        return this.menusSubject;
      }
    
      disconnect(): void {
        this.menusSubject.complete();
        this.loadingSubject.complete();
      }
    }
    
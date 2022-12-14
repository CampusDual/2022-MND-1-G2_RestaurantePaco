import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Menus } from 'src/app/model/menus';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenusService } from 'src/app/services/menus.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-menusedit',
  templateUrl: './menusedit.component.html',
  styleUrls: ['./menusedit.component.scss']
})
export class MenuseditComponent implements OnInit {
  idMenu:number;

  MenusForm: FormGroup;
  menu: Menus;
  errores:string[];
  // menuService: any;
  // menu: any;
  // logger: any;
  // fb: any;

  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  // ) { }

  constructor(
    private fb: FormBuilder,
    private menuService: MenusService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.menu = new Menus();
  }

  onAdd() {
    this.router.navigate(['/menus/add']);
  }
  ngOnInit() {
    this.createFormGroup();
    this.idMenu = this.route.snapshot.params['id'];
    if (this.idMenu) {
      this.menuService.getMenu(this.idMenu).subscribe(
        response => {
          this.menu = response;
          this.MenusForm.patchValue(this.menu, { emitEvent: false, onlySelf: false });
          this.logger.info(this.menu);
        }
      );
    }
  }
  onFormChanges() {
    this.MenusForm.valueChanges.subscribe((val) => {});
  }
  createFormGroup() {
    this.MenusForm = this.fb.group({
      id: [this.menu.idMenu],
      plato1: [this.menu.plato1],
      plato2: [this.menu.plato2],
      postre: [this.menu.postre],
      precio: [this.menu.precio],
      
    });
  }
  save() {
    const newMenu: Menus = Object.assign({}, this.MenusForm.value);
    if (newMenu.idMenu) {
      this.menuService.editMenus(newMenu).subscribe((response) =>{
        this.redirectList(response);
      });
    } else {
      this.menuService.createMenus(newMenu).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }
  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/menus']);
    }else{
      console.log(response);
    }
  }
  cancel() {
    this.router.navigate(['/menus']);
  }
}

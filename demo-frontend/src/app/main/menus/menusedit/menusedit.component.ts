import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Menus } from 'src/app/model/menus';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menusedit',
  templateUrl: './menusedit.component.html',
  styleUrls: ['./menusedit.component.scss']
})
export class MenuseditComponent implements OnInit {
  
  MenusForm: FormGroup;
  menus: Menus;
  idMenu: any;
  menuService: any;
  menu: any;
  menuForm: any;
  logger: any;
  fb: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

 
  onAdd() {
    this.router.navigate(['/menus/add']);
  }
  ngOnInit() {
    this.createFormGroup();
    this.idMenu = this.route.snapshot.params['idMenu'];
    if (this.idMenu) {
      this.menuService.getMenu(this.idMenu).subscribe(
        response => {
          this.menu = response;
          this.menuForm.patchValue(this.menu, { emitEvent: false, onlySelf: false });
          this.logger.info(this.menu);
        }
      );
    }
  }
  createFormGroup() {
    this.menuForm = this.fb.group({
      id: [this.menu.idMenu],
      plato1: [this.menu.plato1, Validators.required],
      plato2: [this.menu.plato2],
      postre: [this.menu.postre],
      precio: [this.menu.precio, [Validators.required, Validators.pattern("^[0-9]{9}$")]],
      
    });
  }
  save() {
    const newMenu: Menus = Object.assign({}, this.MenusForm.value);
    if (newMenu.idMenu) {
      this.menuService.editMenu(newMenu).subscribe((response) =>{
        this.redirectList(response);
      });
    } else {
      this.menuService.createMenu(newMenu).subscribe((response) => {
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

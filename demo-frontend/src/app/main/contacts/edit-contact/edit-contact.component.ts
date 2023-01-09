import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { MenusDataSource } from 'src/app/model/datasource/menus.datasource';
import { AnyField, AnyPageFilter } from 'src/app/model/rest/filter';
import { MenusService } from 'src/app/services/menus.service';
import { Menus } from 'src/app/model/menus';

interface Menuschek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  idContact: number;

  contactForm: FormGroup;
  contact: Contact;
  errores: string[];
  dataSource: MenusDataSource;
  fields = ['select',
  'nombreMenu',
    'idMenu',
    'plato1',
    'plato2',
    'postre',
    'precio',
  ]
  // menus: any;

  menuschek: Menuschek[] = [];

  constructor(
    private fb: FormBuilder,
    private menusService: MenusService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.contact = new Contact();
  }


  ngOnInit() {
    
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      50,
      'idMenu'
    );
    this.menusService.getMenus(pageFilter).subscribe(
      response => {
        console.log(response);
       
        for (var valor of response.data) {
          console.log(valor.nombreMenu);
          console.log(valor.nombreMenu);
          let aas: Menuschek = { value: valor.nombreMenu, viewValue: valor.nombreMenu };
          this.menuschek.push(aas);
        }
      
      });



    this.createFormGroup();

    this.idContact = this.route.snapshot.params['id'];
    if (this.idContact) {
      this.contactService.getContact(this.idContact).subscribe(
        response => {
          this.contact = response;
          this.contactForm.patchValue(this.contact, { emitEvent: false, onlySelf: false });
          this.logger.info(this.contact);
        }
      );
    }
  }
  addmenu ( aasf: any){
    this.menuschek.push(aasf);
  }



  onFormChanges() {
    this.contactForm.valueChanges.subscribe((val) => { });
  }

  createFormGroup() {
    this.contactForm = this.fb.group({
      id: [this.contact.id],
      mesa: [this.contact.mesa],
      menus: [this.contact.menus],
      // food: this.foods,

    });
    //this.menuschek = aa
  }

  save() {
    const newContact: Contact = Object.assign({}, this.contactForm.value);
    if (newContact.id) {
      this.contactService.editContact(newContact).subscribe((response) => {
        this.redirectList(response);
      });
    } else {
      this.contactService.createContact(newContact).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }


  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/contacts']);
    } else {
      console.log(response);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['/contacts']);
  }
  selectedValue: string;



  onAddMenu() {
    //this.router.navigate(['/contacts/add']);
  }

}

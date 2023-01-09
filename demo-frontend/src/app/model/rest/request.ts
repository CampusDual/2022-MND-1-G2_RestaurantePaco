import { Contact } from '../contact';
import { Menus } from '../menus';

export class QuerySortPaginationRequest {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortColumn: string;

  constructor(query: string, pageIndex: number, pageSize: number, sortDirection: string, sortColumn: string) {
    this.query = query;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortColumn = sortColumn;
  }
}
export class CreateContactRequest {

  mesa: number;
  menus: string;

  constructor(contact: Contact) {
        
    this.mesa = contact.mesa;
    this.menus=contact.menus;
  }

}



export class EditContactRequest extends CreateContactRequest {

  id: number;



  constructor(contact: Contact) {

    super(contact);

    this.id = contact.id;

  }

}


export class CreateMenusRequest {
  //idMenu: number;
  nombreMenu: string;
  plato1: string;
  plato2: string;
  postre:string;
  precio: number;

  constructor(menus: Menus) {
    //this.idMenu = menus.idMenu;
    this.nombreMenu=menus.nombreMenu;
    this.plato1 = menus.plato1;
    this.plato2 = menus.plato2;
    this.postre = menus.postre;
    this.precio = menus.precio;
  }
}

export class EditMenusRequest extends CreateMenusRequest {
  idMenu: number;

  constructor(menus: Menus) {
    super(menus);
    this.idMenu = menus.idMenu;
  }
}

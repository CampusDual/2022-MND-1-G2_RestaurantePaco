import { environment } from '../../environments/environment';

export const API_CONFIG = {
  authUrl: environment.authBaseUrl,
  login: environment.authBaseUrl + '/oauth/token',
  logout: environment.authBaseUrl + '/logout',
  getAllProfiles: environment.adminBaseUrl + '/getAllProfiles',
  getAllSections: environment.adminBaseUrl + '/getAllSections',



  // Contacts API
  getContacts: environment.contactsBaseUrl + '/getComandas',
  getContact: environment.contactsBaseUrl + '/getComanda',
  createContact: environment.contactsBaseUrl + '/createComanda',
  editContact: environment.contactsBaseUrl + '/editComanda',
  deleteContact: environment.contactsBaseUrl + '/deleteComanda',

   // Menus API
   getMenus: environment.menusBaseUrl + '/getMenus',
   getMenu: environment.menusBaseUrl + '/getMenu',
   createMenus: environment.menusBaseUrl + '/createMenus',
   editMenus: environment.menusBaseUrl + '/editMenus',
  deleteMenus: environment.menusBaseUrl + '/deleteMenus',
};

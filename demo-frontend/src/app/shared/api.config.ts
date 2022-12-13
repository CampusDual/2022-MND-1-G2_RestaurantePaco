import { environment } from '../../environments/environment';

export const API_CONFIG = {
  authUrl: environment.authBaseUrl,
  login: environment.authBaseUrl + '/oauth/token',
  logout: environment.authBaseUrl + '/logout',
  getAllProfiles: environment.adminBaseUrl + '/getAllProfiles',
  getAllSections: environment.adminBaseUrl + '/getAllSections',



  // Contacts API
  getContacts: environment.contactsBaseUrl + '/getContacts',
  getContact: environment.contactsBaseUrl + '/getContact',
  createContact: environment.contactsBaseUrl + '/createContact',
  editContact: environment.contactsBaseUrl + '/editContact',
  deleteContact: environment.contactsBaseUrl + '/deleteContact',

   // Menus API
   getMenus: environment.menusBaseUrl + '/getMenus',
   getMenu: environment.menusBaseUrl + '/getMenu',
   createMenus: environment.menusBaseUrl + '/createMenus',
   editMenus: environment.menusBaseUrl + '/editMenus',
  deleteMenus: environment.menusBaseUrl + '/deleteMenus',
};

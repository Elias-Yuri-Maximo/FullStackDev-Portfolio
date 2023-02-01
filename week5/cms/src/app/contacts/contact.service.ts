import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] =[];
   contactSelectedEvent = new EventEmitter<Contact> ()
   

   constructor() {
      this.contacts = MOCKCONTACTS;
   }
   getContacts():Contact[]{
    return this.contacts.slice()
   }
   getContact(id: string): Contact {
    //FOR each contact in the contacts list
    for (let contact of this.contacts){
      if (contact.id == id){
        return contact
      }
    } 
    
    return null
    

  }
}
import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] =[];
   contactSelectedEvent = new EventEmitter<Contact> ()
   contactsChangedEvent = new EventEmitter<Contact[]> ()
   

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
  deleteContact(contact: Contact) {
      if (!contact) {
         return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      }

      this.contacts.splice(pos, 1);
      console.log("log on service")
      this.contactsChangedEvent.emit(this.contacts.slice());
  }
}
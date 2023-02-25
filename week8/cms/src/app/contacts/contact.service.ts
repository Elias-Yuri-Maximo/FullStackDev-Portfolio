import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] =[];

   contactSelectedEvent = new EventEmitter<Contact>()
   contactsChangedEvent = new EventEmitter<Contact[]>()
   contactListChangedEvent = new Subject<Contact[]>()

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
  addContact(newContact: Contact){
    if (newContact == null){
      return
    }
    this.contacts.push(newContact)
    //Avisa que mudou o valor
    this.contactListChangedEvent.next(this.contacts.slice())
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (originalContact == null || newContact == null){
      return
    }
    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0){
      return
    }
    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.contactListChangedEvent.next(this.contacts.slice())
  }

  deleteContact(contact: Contact){
    if (contact == null){
      return
    }
    let pos = this.contacts.indexOf(contact)
    if (pos < 0){
      return
    }
    this.contacts.splice(pos, 1)
    this.contactListChangedEvent.next(this.contacts.slice())
  }
  // deleteContact(contact: Contact) {
  //     if (!contact) {
  //        return;
  //     }
  //     const pos = this.contacts.indexOf(contact);
  //     if (pos < 0) {
  //        return;
  //     }

  //     this.contacts.splice(pos, 1);
  //     console.log("log on service")
  //     this.contactsChangedEvent.emit(this.contacts.slice());
  // }

  
  
}
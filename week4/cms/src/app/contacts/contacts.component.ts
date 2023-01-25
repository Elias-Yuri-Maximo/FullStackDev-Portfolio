import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contactSelected:Contact = null

  selectContact(contact:Contact){
    this.contactSelected = contact
    
  }
}

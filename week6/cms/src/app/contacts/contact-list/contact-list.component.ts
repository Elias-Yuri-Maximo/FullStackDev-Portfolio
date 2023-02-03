
import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import {Contact} from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  contacts:Contact[] = [];
  

  //@Output() ClickContactEvent=new EventEmitter<Contact>();

  onSelectItem(contact:  Contact){
    console.log(contact)
    this.contactService.contactSelectedEvent.emit(contact);
  }

  constructor(private contactService: ContactService){
    
  }
  ngOnInit(){
    this.contacts = this.contactService.getContacts()
  }
}

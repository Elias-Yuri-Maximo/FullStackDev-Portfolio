
import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import {Contact} from '../contact.model'
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts:Contact[] = [];
  term:string
  subscription: Subscription;

  //@Output() ClickContactEvent=new EventEmitter<Contact>();

  onSelectItem(contact:  Contact){
    console.log(contact)
    this.contactService.contactSelectedEvent.emit(contact);
  }

  constructor(private contactService: ContactService){
    
  }
  ngOnInit(){
    //this.contactService.fetchContact();
    this.contacts = this.contactService.getContacts()
    //Subject
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsArray: Contact[])=>{
      this.contacts = contactsArray
    });
    //EventEmitter
    // this.contactService.contactsChangedEvent.subscribe((contactsArray: Contact[])=>{
    //   this.contacts = contactsArray  
    // })
  }
  search(value: string) {
    console.log(value)
    this.term = value;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

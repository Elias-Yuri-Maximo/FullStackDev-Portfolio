import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})
export class ContactsComponent implements OnInit, OnDestroy{
  contactSelected:Contact = null;

  //selectContact(contact:Contact){
  //  this.contactSelected = contact
  //}

  constructor(private contactService:ContactService){}

  ngOnInit(): void {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact)=>{
          console.log(contact)
          this.contactSelected = contact
        }
      )
  }
  ngOnDestroy(){
    this.contactService.contactSelectedEvent.unsubscribe();
  }

}

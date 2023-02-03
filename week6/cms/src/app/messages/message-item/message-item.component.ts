import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message : Message
  messageSender:string
  private contactService: ContactService
  //@Input() messageText: string
constructor( contactService: ContactService){
  this.contactService = contactService
}
ngOnInit(){
  const contact: Contact = this.contactService.getContact(this.message.sender);
  this.messageSender = contact.name;
}
}


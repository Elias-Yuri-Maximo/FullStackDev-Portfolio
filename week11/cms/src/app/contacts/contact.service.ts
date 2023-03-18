import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] = [];
   maxContactId: number = 0;
   contactSelectedEvent = new EventEmitter<Contact>()
   contactsChangedEvent = new EventEmitter<Contact[]>()
   contactListChangedEvent = new Subject<Contact[]>()

  constructor(private httpClient: HttpClient) {
    this.fetchContact()
  }

   getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId =+ contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeContacts() {
    let contactsString = JSON.stringify(this.contacts);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('https://fullstackproject-87550-default-rtdb.firebaseio.com/contacts.json', contactsString, {headers: headers})
    .subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }
   fetchContact(): void {
    this.httpClient.get<any>('http://localhost:3000/contacts')
    .subscribe(
      (data: any) => {
        this.contacts= data.contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact)

    this.httpClient.post<{message: string, contact: Contact}>('http://localhost:3000/contacts',
    newContact, {headers: headers}).subscribe(responseData => {
      //this.contacts.push(responseData.contact);
      this.sortAndSend();
    })
    //Avisa que mudou o valor
    //this.storeContacts();
    // this.contactListChangedEvent.next(this.contacts.slice())
  }

  
  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
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
    //this.storeContacts();
    //this.contactListChangedEvent.next(this.contacts.slice())

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/documents/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
  }

  deleteContact(contact: Contact){
    if (contact == null){
      return
    }
    let pos = this.contacts.indexOf(contact)
    if (pos < 0){
      return
    }
    // this.contacts.splice(pos, 1)
      // delete from database
      this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
    //this.contactListChangedEvent.next(this.contacts.slice())
    // this.storeContacts();
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
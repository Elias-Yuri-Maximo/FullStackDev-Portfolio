import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) : any {
    let filtered: Contact[] = [];
    
    for (let contact of contacts){
      console.log(contact)
        if(  contact.name.includes(term)){
          filtered.push(contact)
        }
    }
    if(filtered.length <=0){
       return contacts
    }
    return filtered;
  }
}


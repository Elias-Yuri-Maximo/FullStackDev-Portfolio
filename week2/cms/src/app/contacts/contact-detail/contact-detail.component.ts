import { Component } from '@angular/core';
import { Contact } from '../contact-list/contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
 
  contacts:Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu",  "208-496-3771", "../../assets/images/jacksonk.jpg", null ),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu",  "208-496-3768", "../../assets/images/barzeer.jpg", null )
  ];

  constructor(){

   }
  ngOnInit(){

  }
}

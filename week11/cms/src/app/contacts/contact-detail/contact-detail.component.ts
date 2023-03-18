import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Params } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  id:string
  contacts:Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu",  "208-496-3771", "../../assets/images/jacksonk.jpg", null ),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu",  "208-496-3768", "../../assets/images/barzeer.jpg", null )
  ];
  //@Input() contact:Contact
  contact:Contact

  constructor(private contactService:ContactService, private router: Router, private activatedRoute:ActivatedRoute){

   }
  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = params['id']
      this.contact = this.contactService.getContact(this.id)
    })
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}

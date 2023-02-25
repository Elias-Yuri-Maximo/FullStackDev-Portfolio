import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document:Document;
  editMode:boolean = false;

  ngOnInit(){
  }

  onCancel(){

  }

  onSubmit(form: NgForm) {
  }
}

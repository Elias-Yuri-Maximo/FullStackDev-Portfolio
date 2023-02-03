import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  documents: Document[] = []
//@Output () selectedDocumentEvent = new EventEmitter <Document>();

constructor(private documentService: DocumentService) { }

onSelectedDocument(document: Document){
  //console.log("clicl event")
  this.documentService.documentSelectedEvent.emit(document)
}

  ngOnInit(): void{
    this.documents = this.documentService.getDocuments();
  }



}

import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [new Document ("23", "file.doc", "This file contain an assignment", "url:string.txt", null),
  new Document ("24", "filebla.doc", "This file contain an assignment3", "url.string.test2.txt", null)
]
@Output () selectedDocumentEvent = new EventEmitter <Document>();

onSelectedDocument(document: Document){
  console.log("clicl event")
  this.selectedDocumentEvent.emit(document)
}

}

import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[]
  documentListChangedEvent = new Subject<Document[]>();
  
  maxDocumentId: number;
  
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    // Se não encontrou, para o metodo
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }


  getDocuments(): Document[] {
    return this.documents;
  }



  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

//   deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.emit(this.documents.slice());
//  }

deleteDocument(document: Document) {
  if (!document) {
      return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
      return;
  }
  this.documents.splice(pos, 1);
  this.documentListChangedEvent.next(this.documents.slice());
}

  
 

}

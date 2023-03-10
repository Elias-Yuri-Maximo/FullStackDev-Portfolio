import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId: number;

  documentListChangedEvent = new Subject<Document[]>();
  
  
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();

  constructor(private httpClient:HttpClient) { 
    this.fetchDocuments();
  }

  storeDocuments() {
    return this.httpClient.put(
      "https://fullstackproject-87550-default-rtdb.firebaseio.com/documents.json",
      JSON.stringify(this.documents), 
      {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json'}
        ),
      }
    )
  }

  fetchDocuments(): void {
    this.httpClient.get<Document[]>('https://fullstackproject-87550-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    this.storeDocuments().subscribe(()=>this.documentListChangedEvent.next(this.documents.slice()));
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
    this.storeDocuments().subscribe(()=> this.documentListChangedEvent.next(this.documents.slice()))
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
  this.storeDocuments().subscribe(()=> this.documentListChangedEvent.next(this.documents.slice()));
}

  
 

}

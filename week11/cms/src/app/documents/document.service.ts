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
  documentListChangedEvent = new Subject<Document[]>();
  
  maxDocumentId: number;
  
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();

  constructor(private httpClient:HttpClient) { 
    this.fetchDocuments();
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId(); 
  }

  storeDocuments() {
    return this.httpClient.put(
      "http://localhost:3000/documents",
      JSON.stringify(this.documents), 
      {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json'}
        ),
      }
    )
  }

  fetchDocuments(): void {
    this.httpClient.get<any>('http://localhost:3000/documents')
    .subscribe(
      (data: any) => {
        this.documents = data.document;
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
    // make sure id of the new Document is empty
    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  
  sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice())
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.httpClient.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
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
  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }
  // delete from database
  this.httpClient.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
}
  
 

}

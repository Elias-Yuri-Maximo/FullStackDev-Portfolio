import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents: Document[] = []
  subscription : Subscription;

//@Output () selectedDocumentEvent = new EventEmitter <Document>();
constructor(private documentService: DocumentService) { }


  ngOnInit(): void{
    this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[])=>{
      this.documents = documents;
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }


}

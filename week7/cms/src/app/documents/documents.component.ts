import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';


@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit() : void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

  selectDocument(document: Document){
    this.selectedDocument = document
  }

}

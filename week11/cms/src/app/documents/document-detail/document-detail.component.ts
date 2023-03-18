import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/shared/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';



@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  //@Input() documentInput:Document;
  constructor(private documentService:DocumentService, private router:Router, private activatedRoute:ActivatedRoute, private windRefService:WindRefService){
  }
  id: string
  document: Document
  nativeWindow: any

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document =  this.documentService.getDocument(this.id)
    })
    
    this.nativeWindow = this.windRefService.getNativeWindow() 
  }
  onView(){
    if (this.document.url){
    this.nativeWindow.open(this.document.url)
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }

}

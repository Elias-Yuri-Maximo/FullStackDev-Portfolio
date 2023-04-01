import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from "@angular/router"
import { BooksService } from "../../books.service"
import { Book } from "../book.model"

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  id: string
  book: Book

  constructor(private booksService: BooksService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id = params['id']
        this.book = this.booksService.getBook(this.id)
      }
    })
  }

  onDelete(){
    this.booksService.deleteBook(this.book)
    this.router.navigate(["books"])
  }
}

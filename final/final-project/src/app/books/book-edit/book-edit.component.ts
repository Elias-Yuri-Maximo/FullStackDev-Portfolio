import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../books.service'
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{

  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  id: string;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params)=>{
        this.id = params['id']
        if(this.id == undefined || this.id == null){
          this.editMode = false
          return
        }
        this.originalBook = this.booksService.getBook(this.id);
        if(this.originalBook == undefined || this.originalBook == null){
          return
        }
        this.editMode = true
        this.book = JSON.parse(JSON.stringify(this.originalBook))
      }
    })
  }

  onCancel(){
    this.router.navigate(['books'])
  }

  onSubmit(form: NgForm){
    let value = form.value;
    let newBook = new Book(null,null,value.title, value.author, value.yearPublished, value.description, value.imagePath);
    if(this.editMode == true ){
      this.booksService.updateBook(this.originalBook, newBook);
    }else{
      this.booksService.addBook(newBook);
    }
    this.router.navigate(['books'])
  }
}

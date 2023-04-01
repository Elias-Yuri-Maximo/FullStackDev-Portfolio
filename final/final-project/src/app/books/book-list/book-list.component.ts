import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../../books.service'
import { Subscription, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books : BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([])

  subscription: Subscription;
  constructor(public booksService: BooksService){

  }

  ngOnInit(): void {
    this.books.next(this.booksService.getBooks());
    this.subscription = this.booksService.bookListChangedEvent.subscribe({
      next: (newBooks: Book[]) => {
        this.books.next(newBooks);
      }
    });
  }

}

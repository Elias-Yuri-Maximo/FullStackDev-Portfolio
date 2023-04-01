import { Injectable } from '@angular/core';
import { Book } from './books/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  maxBookId: number;
  books: Book[] = []
  bookListChangedEvent = new Subject<Book[]>();

  constructor(private httpClient: HttpClient) { 
    this.fetchBooks();
    this.maxBookId = this.getMaxId();
  }
    //this.fetchDocuments();
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId(); 
  

  fetchBooks(): void {
    this.httpClient.get<any>('http://localhost:3000/books')
    .subscribe(
      (data: any) => {
        this.books = data.data;
        this.maxBookId = this.getMaxId();
        this.books.sort((a, b) => (a.title > b.title) ? 1 : -1);
        this.bookListChangedEvent.next(this.books.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.books) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addBook(book: Book) {
    if (!book) {
      return;
    }
    // make sure id of the new Book is empty
    book.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.httpClient.post<{ message: string, data: Book }>('http://localhost:3000/books',
    book,
      { headers: headers })
      .subscribe(
        {
          next: (responseData)=>{
            console.log("RESPONSE", responseData)
            this.books.push(responseData.data);
            this.sortAndSend();
          },
          error: (error: any) => {
            console.log(error);
          }
        }
      );
  }
  
  sortAndSend(){
    this.books.sort((a,b)=>{
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.bookListChangedEvent.next(this.books.slice())

  }

  updateBook(originalBook: Book, newBook: Book) {
    if (!originalBook || !newBook) {
      return;
    }

    const pos = this.books.findIndex(d => d.id === originalBook.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newBook.id = originalBook.id;
    newBook._id = originalBook._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.httpClient.put('http://localhost:3000/books/' + originalBook.id,
      newBook, { headers: headers })
      .subscribe(
        {
          next: (response) =>{
            this.books[pos] = newBook;
            this.sortAndSend();
          }
        }
        
      );
  }


  getBooks(): Book[] {
    return this.books;
  }



  getBook(id: string): Book {
    for (let book of this.books) {
      if (book.id === id) {
        return book;
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

deleteBook(book: Book) {

  if (!book) {
    return;
  }
  const pos = this.books.findIndex(d => d.id === book.id);

  if (pos < 0) {
    return;
  }
  // delete from database
  this.httpClient.delete('http://localhost:3000/books/' + book.id)
    .subscribe(
      {
        next: (response) => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      }
    );
}
  
 

}



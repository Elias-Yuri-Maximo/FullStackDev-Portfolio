import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component'

const routes : Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"books"
  },
  {
    path:"books",
    component:BooksComponent,
    children: [
      { path : "new", component: BookEditComponent },
      { path : ":id", component: BookDetailComponent },
      { path : ":id/edit", component: BookEditComponent }

    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

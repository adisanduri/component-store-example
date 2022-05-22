import { Component, OnInit } from '@angular/core';
import { BooksStore } from '../books.store';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  providers: [BooksStore]
  // styleUrls: [ './books-list.component.css' ]
})
export class BooksList implements OnInit {
  constructor(private readonly booksStore: BooksStore) {}
  
  ngOnInit(): void {
    this.booksStore.getBooks();
  }
    
}

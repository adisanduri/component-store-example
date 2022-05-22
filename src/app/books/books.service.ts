import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Book } from "./book.model";

export class BooksService {
  constructor(private http: HttpClient) {}  

  fetchBooks(): Observable<Book[]> {
    // return this.http.get<Book[]>('/api/books');
    const books: Book[] = [{
      id: 'abc',
      name: 'dani din',
      author: 'gila'
    },
    {
      id: 'efg',
      name: 'spiderman',
      author: 'dicm'
    }
  ]
    return of(books);
  }


}
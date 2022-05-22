import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { BooksService } from './books.service';
import { tapResponse } from '@ngrx/component-store/src/tap-response';

export interface BooksState {
  books: Book[];
  loading: boolean;
  selectedBook: Book;
}

const initialState: BooksState = {
  books: null,
  loading: false,
  selectedBook: null,
};

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {
  constructor(private booksService: BooksService) {
    super(initialState);
  }

  /**************** Selectors ***************/
  readonly loading$ = this.select((state) => state.loading);
  readonly books$ = this.select((state) => state.books);
  readonly selectedBook$ = this.select((state) => state.selectedBook);

  /**************** Effects ***************/
  readonly getBooks = this.effect((emptyObservable$: Observable<undefined>) => {
    return emptyObservable$.pipe(
      switchMap(() => {
        this.patchState({ loading: true });
        return this.booksService.fetchBooks().pipe(
          tapResponse(
            (result: Book[]) => {
              this.patchState({ loading: false, books: result });
            },
            (err) => {
              this.patchState({ loading: false });
              alert('Operation Failed');
            }
          )
        );
      })
    );
  });

  readonly getBook = this.effect((bookId$: Observable<string>) => {
    return bookId$.pipe(
      switchMap((bookId: string) => {
        this.patchState({ loading: true });
        return this.booksService.getBookById(bookId).pipe(
          tapResponse(
            (result: Book) => {
              this.patchState({ loading: false, selectedBook: result });
            },
            (err) => {
              this.patchState({ loading: false });
              alert('Operation Failed');
            }
          )
        );
      })
    );
  });
}

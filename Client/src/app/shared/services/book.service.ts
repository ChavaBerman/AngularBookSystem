import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  book;
  subjectBook  = new Subject();
  subjectBookList  = new Subject();
  bookForDelete;
  constructor(private http: HttpClient) { }

  
  getBooksList(filterString) {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${filterString}&maxResults=40&fields=items(saleInfo%2FlistPrice%2CvolumeInfo(authors%2Cdescription%2CimageLinks(smallThumbnail%2Cthumbnail)%2Clanguage%2CmainCategory%2CpageCount%2CpublishedDate%2Cpublisher%2Csubtitle%2Ctitle))`);
  }
}

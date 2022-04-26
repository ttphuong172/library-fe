import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiURL = environment.apiURL;

  constructor(
    private httpClient: HttpClient,
    private authService:AuthService
  ) {
  }

  searchBookByISBN(isbn: any) {
    return this.httpClient.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data&format=json')
  }

  save(book: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL + '/api/books', book,httpOptions)
  }

  findAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/api/books',httpOptions)
  }

  findById(id: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/api/books/' + id,httpOptions);
  }

  findAllByRack_Id(id: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/api/books/racks/' + id,httpOptions)
  }

  delete(id: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.delete(this.apiURL + '/api/books/' + id,httpOptions)
  }

  search(isbn: any, title: any, publisher: any, status: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/api/books/search/?isbn=' + isbn + '&title=' + title + '&publisher=' + publisher + '&status=' + status,httpOptions)
  }
}

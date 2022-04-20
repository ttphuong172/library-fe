import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpClient:HttpClient
  ) { }

  searchBookByISBN(isbn:any){
    return  this.httpClient.get('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn+'&jscmd=data&format=json')
  }
  save(book:any){
    return this.httpClient.post('http://localhost:8080/api/books',book)
  }
  findAll(){
    return this.httpClient.get('http://localhost:8080/api/books')
  }
  findById(id:any){
    return this.httpClient.get('http://localhost:8080/api/books/'+id);
  }
  findAllByRack_Id(id:any){
    return this.httpClient.get('http://localhost:8080/api/books/bookcases/'+ id)
  }
  delete(id:any){
    return this.httpClient.delete('http://localhost:8080/api/books/' + id)
  }
  search(isbn:any,title:any,publisher:any,status:any){
    return this.httpClient.get('http://localhost:8080/api/books/search/?isbn='+ isbn + '&title='+ title + '&publisher='+publisher + '&status='+status)
  }
}

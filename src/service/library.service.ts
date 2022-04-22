import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return  this.httpClient.get('http://localhost:8080/api/libraries')
  }
}

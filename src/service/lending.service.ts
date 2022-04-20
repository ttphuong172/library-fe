import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LendingService {

  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get('http://localhost:8080/api/lendings')
  }
  save(lending:any){
    return this.httpClient.post('http://localhost:8080/api/lendings',lending)
  }
  findById(id:any){
    return this.httpClient.get('http://localhost:8080/api/lendings/'+ id);
  }
}

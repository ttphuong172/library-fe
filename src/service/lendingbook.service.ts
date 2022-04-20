import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LendingbookService {

  constructor(
    private httpClient:HttpClient
  ) { }
  findAllByBook_IdAndReturnDateIsNull(id:any){
    return  this.httpClient.get('http://localhost:8080/api/lendingbooks/'+id);
  }
  findAllByReturnDateIsNotNull(){
    return  this.httpClient.get('http://localhost:8080/api/lendingbooks');
  }
  comfirmReturn(lendingBookDTOList:any){
    return this.httpClient.post('http://localhost:8080/api/lendingbooks/comfirm',lendingBookDTOList)
  }
}

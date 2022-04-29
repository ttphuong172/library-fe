import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LendingbookService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }

  // Get book not yet return
  findAllByBook_IdAndReturnDateIsNull(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/lendingbooks/books/'+id,httpOptions);
  }


  //Get list returned
  findAllByReturnDateIsNotNull(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return  this.httpClient.get(this.apiURL+'/api/lendingbooks',httpOptions);
  }

  comfirmReturn(lendingBookDTOList:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL+'/api/lendingbooks/comfirm',lendingBookDTOList,httpOptions)
  }
}

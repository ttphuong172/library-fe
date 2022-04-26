import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LendingService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }
  findAll(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/lendings',httpOptions)
  }
  save(lending:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL+'/api/lendings',lending,httpOptions)
  }
  findById(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/lendings/'+ id,httpOptions);
  }
}

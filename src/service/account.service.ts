import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiURL=environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }

  findById(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/' + id,httpOptions);
  }

  findByUsername(username:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/username/' + username,httpOptions);
  }

  borrowerFindAll(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return  this.httpClient.get(this.apiURL+'/api/accounts/borrowers',httpOptions);
  }
  findBorrowerById(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/borrowers/' + id,httpOptions);
  }
  changePassword(changePasswordDTO:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.put(this.apiURL+'/api/accounts/changepassword',changePasswordDTO,httpOptions)
  }
}

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

  findAll(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts',httpOptions)
  }

  save(account:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL + '/api/accounts', account,httpOptions)
  }

  update(account:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.put(this.apiURL+'/api/accounts/' + account.username, account,httpOptions)
  }

  findById(id:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/' + id,httpOptions);
  }

  findByCode(code:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/code/' + code,httpOptions);
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

  search(code:any,username:any,fullname:any,position:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/accounts/search/?code=' + code + '&username=' + username + '&fullname=' + fullname + '&position=' + position ,httpOptions)
  }

  delete(username: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.delete(this.apiURL + '/api/accounts/' + username,httpOptions)
  }

}

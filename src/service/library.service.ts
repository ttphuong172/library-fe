import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
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
    return  this.httpClient.get(this.apiURL+'/api/libraries',httpOptions)
  }
}

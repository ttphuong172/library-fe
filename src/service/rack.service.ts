import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RackService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient: HttpClient,
    private authService:AuthService
  ) {
  }

  findAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/racks',httpOptions)
  }

  findById(id: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/racks/' + id,httpOptions)
  }

  findAllByLibrary_Name(name: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/racks/library/' + name,httpOptions)
  }

  findAllDTOByLibrary_Name(name: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL+'/api/racks/library/dto/' + name,httpOptions)
  }

  save(rack: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL+'/api/racks', rack,httpOptions)
  }

  update(rack: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.put(this.apiURL+'/api/racks/' + rack.id, rack,httpOptions)
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return sessionStorage.getItem('jwtToken');
  }

  public setUsername(username: string) {
    sessionStorage.setItem('username', username);
  }

  public getUsername() {
    return sessionStorage.getItem('username');
  }

  public setRole(role: string) {
    sessionStorage.setItem("role", role)
  }

  public getRole() {
    return sessionStorage.getItem('role')
  }
}

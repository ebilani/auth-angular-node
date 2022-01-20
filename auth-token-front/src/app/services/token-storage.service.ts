import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  constructor() { }

  signOut(): void{
    sessionStorage.clear();
  }
  saveToken(token: string): void{
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY)
  }
  saveUser(user: any): void{
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, user);
  }
  getUser(): any{
    const user = sessionStorage.getItem(this.USER_KEY);
    if(user){
      return JSON.parse(user)
    }
    return {};
  }
}

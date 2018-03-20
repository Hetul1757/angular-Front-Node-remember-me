import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const ID="id";

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveId(id:string){
    window.sessionStorage.removeItem(ID);
    window.sessionStorage.setItem(ID,id);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getId():string {
    return sessionStorage.getItem(ID);
  }
}


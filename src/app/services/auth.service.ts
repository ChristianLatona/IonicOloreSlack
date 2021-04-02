import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private genericUrl='http://localhost:3000/auth/'
  constructor(private http: HttpClient) {}

  signIn = async (email,password) => {//ho tolto i generics x ora, l'idea è di prendere solo lo status code, visto che i messages sono useless
  //forse nel subscribe prende pure lo status code
    let data = this.http.post(`${this.genericUrl}login`, null, {headers: {email, password}}).toPromise() as Promise<{token:string, message:string}>
    //await this.http.post(`${this.genericUrl}login`, null,{headers:{email,password}}).subscribe((value) => data=value)
    //Il subscribe funziona e prende il valore, però quando provo a stamparlo su signIn da undefined
    //Con il subscribe non mi permetteva di fare la destrutturazione in signIn
    return data
  }

  signOut(tkn){
    return this.http.delete(this.genericUrl+"logout",{headers:{tkn}})
  }

  register(username,email,password){
    return this.http.post(this.genericUrl+"register",{headers:{username:username,email:email,password:password}})
  }

  deleteAccount(email){
    return this.http.delete(this.genericUrl+"user",{headers:{email:email}})
  }

  //nell' auth?
  getEmail(tkn){
    return this.http.get(this.genericUrl+"email",{headers:{tkn:tkn}})
  }
}

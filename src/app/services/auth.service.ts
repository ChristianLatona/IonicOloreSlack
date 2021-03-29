import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private genericUrl='http://localhost:4200/auth/'
  constructor(private http: HttpClient) {}

  signIn(email,password){//ho tolto i generics x ora, l'idea è di prendere solo lo status code, visto che i messages sono useless
  //forse nel subscribe prende pure lo status code
    let _data
    this.http.get(this.genericUrl+"login",{headers:{email:email,password:password}}).subscribe(data =>_data=data)
    return _data
  }

  signOut(tkn){
    return this.http.delete(this.genericUrl+"logout",{headers:{tkn:tkn}})
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

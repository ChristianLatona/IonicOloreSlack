import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private genericUrl='http://localhost:3000/auth/'
  constructor(private http: HttpClient) {}

  signIn = async(email:string,password:string) => {
    let error;
    try{
      let data = await this.http.post(`${this.genericUrl}login`, null, {headers: {email, password}, observe: "response"}).toPromise() as HttpResponse<Object>
      return data
    }catch({error:{message}}){
      error = message;
    }
    return error;
  }
  //Il logout non funziona con panetty, ma funzione con test
  //Cose strane accadono
  logout = (tkn:string) => {
    try{
      this.http.delete(`${this.genericUrl}logout`,{headers:{tkn}}).toPromise() as Promise<{message:string}>
    }catch(e){
      console.log("errore",e)
    }
  }

  register = (username:string,email:string,password:string) => this.http.post(`${this.genericUrl}register`,{headers:{username,email,password}, observe:"response"}).toPromise() as Promise<HttpResponse<Object>>

  deleteAccount = async (tkn:string) => {
    let {body} = await this.getEmail(tkn)
    return this.http.delete(`${this.genericUrl}user`,{headers:{email:body as string}, observe:"response"}).toPromise() as Promise<HttpResponse<Object>>
  }

  getEmail = (tkn:string) => this.http.get(`${this.genericUrl}email`,{headers:{tkn}, observe:"response"}).toPromise() as Promise<HttpResponse<Object>>
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private genericUrl='http://localhost:3000/auth/'
  constructor(private http: HttpClient) {}

  signIn = async(email:string,password:string) => {
    let error;
    try{
      return await this.http.post(`${this.genericUrl}login`, null, {headers: {email, password}, observe: "response"}).toPromise() as HttpResponse<Object>
    }catch({error:{message}}){
      error = message;
    }
    return error;
  }
  
  logout = async(tkn:string) => {
    try{
      let data = await this.http.delete(`${this.genericUrl}logout`,{headers:{tkn}}).toPromise() as Promise<{message:string}>
    }catch(e){
      console.log("errore",e)
    }
  }

  register = async (username:string,email:string,password:string) => {
    let u:User = {username, email, password}
    try{//non torna lo status ma è uguale alle altre
      return await this.http.post(`${this.genericUrl}register`,u).toPromise() as HttpResponse<Object>
    }catch({error:{message}}){
      return message as string
    }

  }

  deleteAccount = async (tkn:string) => {
    let data = await this.getEmail(tkn);
    try{
      return await this.http.delete(`${this.genericUrl}user`,{headers:{email:String(data.message)}, observe:"response"}).toPromise() as HttpResponse<Object>
    }catch(e){
      console.log(e)
    }
  }

  getEmail = async(tkn:string) => {
    try{
      let data = await this.http.get(`${this.genericUrl}email`,{headers:{tkn}}).toPromise() as Promise<{message:string}>
      return data
    }catch(e){
      console.log(e)
    }
  }
}

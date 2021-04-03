import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private genericUrl='http://localhost:3000/home/'
  constructor(private http: HttpClient) { }

  workspacesList = async(tkn:string) => {
    return await this.http.get(`${this.genericUrl}workspaces`, {headers:{tkn},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  createWorkspace = async(tkn:string,name:string) => {
    return await this.http.post(`${this.genericUrl}workspace`,{name},{headers:{tkn:tkn},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  joinWorkspace = async(tkn:string,workspace_id:string) => {
    try{
      return await this.http.post(`${this.genericUrl}join/workspace`, null,{headers:{tkn,workspace_id},observe: 'response'}).toPromise() as HttpResponse<Object>
    }catch({error:{message}}){
      return message;
    }
  }
}

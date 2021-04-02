import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private genericUrl='http://localhost:3000/home/'
  constructor(private http: HttpClient) { }

  // //l'observe:response dovrebbe prendere tutto il json
  // enterWorkspace(tkn,name){//le get possono avere body??
  //   return this.http.get(this.genericUrl+"enter/workspace",{headers:{tkn:tkn},observe: 'response' })
  // }

  workspacesList = async(tkn:string) => {
    return this.http.get(`${this.genericUrl}workspaces`, {headers:{tkn},observe: 'response' }).toPromise() as Promise<HttpResponse<Object>>
  }

  createWorkspace = async(tkn,name) => {
    return this.http.post(this.genericUrl+"workspace",name,{headers:{tkn:tkn},observe: 'response' }).toPromise() as Promise<HttpResponse<Object>>
  }

  joinWorkspace(tkn,workspace_id){
    return this.http.post(this.genericUrl+"workspace",{headers:{tkn:tkn,workspace_id:workspace_id},observe: 'response'}).toPromise() as Promise<HttpResponse<Object>>
  }
}

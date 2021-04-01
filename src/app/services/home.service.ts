import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private genericUrl='http://localhost:4200/home/'
  constructor(private http: HttpClient) { }

  // //l'observe:response dovrebbe prendere tutto il json
  // enterWorkspace(tkn,name){//le get possono avere body??
  //   return this.http.get(this.genericUrl+"enter/workspace",{headers:{tkn:tkn},observe: 'response' })
  // }

  createWorkspace(tkn,name){
    return this.http.post(this.genericUrl+"workspace",name,{headers:{tkn:tkn},observe: 'response' })
  }

  getWorkspaces(tkn){
    return this.http.get(this.genericUrl+"workspace",{headers:{tkn:tkn},observe: 'response' })
  }

  joinWorkspace(tkn,workspace_id){
    return this.http.post(this.genericUrl+"workspace",{headers:{tkn:tkn,workspace_id:workspace_id},observe: 'response'})
  }
}

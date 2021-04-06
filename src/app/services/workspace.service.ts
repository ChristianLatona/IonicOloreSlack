import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private genericUrl='http://localhost:3000/workspaces/'
  constructor(private http: HttpClient) { }

  //l'observe:response dovrebbe prendere tutto il json
  getWorkspaceName = async(workspace_id:string) => {
    try{
      return await this.http.get(`${this.genericUrl}`,{headers:{workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
    }catch(e){
      console.log(e);
    }
  }

  createChannel = async(workspace_id:string,tkn:string,channelName:string,privacy:Boolean) => {
    return await this.http.post(`${this.genericUrl}channels`,{channelName,privacy},{headers:{workspace_id:workspace_id,tkn},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getChannels = async(workspace_id:string) => {
    return await this.http.get(`${this.genericUrl}channels`,{headers:{workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getUsers = async(workspace_id:string) => {
    return await this.http.get(`${this.genericUrl}users`,{headers:{workspace_id:workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  leaveWorkspace = async(tkn:string,workspace_id:string) => {
    return await this.http.delete(`${this.genericUrl}leave`,{headers:{tkn:tkn,workspace_id:workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  deleteChannel = async(workspace_id:string,channel_id:string) => {
    return await this.http.delete(`${this.genericUrl}channels`,{headers:{workspace_id:workspace_id,channel_id:channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

}

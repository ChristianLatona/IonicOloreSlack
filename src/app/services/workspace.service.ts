import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private genericUrl='http://localhost:4200/workspace/'
  constructor(private http: HttpClient) { }

  //l'observe:response dovrebbe prendere tutto il json
  getWorkspaceName(workspace_id){//le get possono avere body??
    return this.http.get(this.genericUrl,{headers:{workspace_id:workspace_id},observe: 'response' })
  }

  createChannel(workspace_id,tkn,channelName,privacy){//le get possono avere body??
    return this.http.post(this.genericUrl+"channels",{channelName:channelName,privacy:privacy},{headers:{workspace_id:workspace_id,tkn},observe: 'response' })
  }

  getChannels(workspace_id){
    return this.http.get(this.genericUrl+"channels",{headers:{workspace_id:workspace_id},observe: 'response' })
  }

  getUsers(workspace_id){
    return this.http.get(this.genericUrl+"users",{headers:{workspace_id:workspace_id},observe: 'response' })
  }

  leaveWorkspace(tkn,workspace_id){
    return this.http.delete(this.genericUrl+"leave",{headers:{tkn:tkn,workspace_id:workspace_id},observe: 'response' })
  }

  deleteChannel(workspace_id,channel_id){
    return this.http.delete(this.genericUrl+"channels",{headers:{workspace_id:workspace_id,channel_id:channel_id},observe: 'response' })
  }

}
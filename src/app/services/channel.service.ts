import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private genericUrl='http://localhost:4200/channels/'
  constructor(private http: HttpClient) { }

  getChannelName = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}`,{headers:{channel_id:channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getAllMessages = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}messages`,{headers:{channel_id:channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getAllUsers = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}users`,{headers:{channel_id:channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getUsername = async(user_email:string) => {
    return await this.http.get(`${this.genericUrl}users/user`,{headers:{user_email:user_email},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  createMessage = async(channel_id:string,user_email:string) => {
    return await this.http.post(`${this.genericUrl}messages`, null,{headers:{channel_id:channel_id,user_email:user_email},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  replyMessage = async(user_email:string,message_id:string) => {
    return await this.http.post(`${this.genericUrl}messages/replies`, null,{headers:{user_email:user_email,message_id:message_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  addToChannel = async(to_add:string,channel_id:string,workspace_id:string) => {
    return await this.http.put(`${this.genericUrl}add`, null,{headers:{to_add:to_add,channel_id:channel_id,workspace_id:workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  leaveChannel = async(user_email:string,channel_id:string) => {
    return await this.http.delete(this.genericUrl+"leave",{headers:{user_email:user_email,channel_id:channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private genericUrl='http://localhost:4200/channels/'
  constructor(private http: HttpClient) { }

  getChannelName(channel_id){
    return this.http.get(this.genericUrl,{headers:{channel_id:channel_id},observe: 'response' })
  }

  getAllMessages(channel_id){
    return this.http.get(this.genericUrl+"messages",{headers:{channel_id:channel_id},observe: 'response' })
  }

  getAllUsers(channel_id){
    return this.http.get(this.genericUrl+"users",{headers:{channel_id:channel_id},observe: 'response' })
  }

  getUsername(user_email){
    return this.http.get(this.genericUrl+"users/user",{headers:{user_email:user_email},observe: 'response' })
  }

  createMessage(channel_id,user_email){
    return this.http.post(this.genericUrl+"messages",{headers:{channel_id:channel_id,user_email:user_email},observe: 'response' })
  }

  replyMessage(user_email,message_id){
    return this.http.post(this.genericUrl+"messages/replies",{headers:{user_email:user_email,message_id:message_id},observe: 'response' })
  }

  addToChannel(to_add,channel_id,workspace_id){
    return this.http.put(this.genericUrl+"add",{headers:{to_add:to_add,channel_id:channel_id,workspace_id:workspace_id},observe: 'response' })
  }

  leaveChannel(user_email,channel_id){
    return this.http.delete(this.genericUrl+"leave",{headers:{user_email:user_email,channel_id:channel_id},observe: 'response' })
  }
}

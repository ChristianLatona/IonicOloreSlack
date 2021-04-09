import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private genericUrl='http://localhost:3000/channels/'
  constructor(private http: HttpClient) { }

  getChannelName = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}`,{headers:{channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getChannelPrivacy = async(channel_id:string) => {
    try {
      return await this.http.get(`${this.genericUrl}privacy`,{headers: {channel_id}, observe: 'response'}).toPromise() as HttpResponse<Object>
    } catch ({error:{message}}) {
      console.log(message)
    }
  }

  getAllMessages = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}messages`,{headers:{channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getAllUsers = async(channel_id:string) => {
    return await this.http.get(`${this.genericUrl}users`,{headers:{channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  getUsername = async(user_email:string) => {
    return await this.http.get(`${this.genericUrl}users/user`,{headers:{user_email},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  createMessage = async(channel_id:string,user_email:string, content:string) => {
    return await this.http.post(`${this.genericUrl}messages`, {content},{headers:{channel_id,user_email},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  replyMessage = async(user_email:string,message_id:string, content:string) => {
    return await this.http.post(`${this.genericUrl}messages/replies`, {content},{headers:{user_email,message_id},observe: 'response' }).toPromise() as HttpResponse<Object>
  }

  addToChannel = async(to_add:string,channel_id:string,workspace_id:string) => {
    try{
      return await this.http.put(`${this.genericUrl}add`, null,{headers:{to_add,channel_id,workspace_id},observe: 'response' }).toPromise() as HttpResponse<Object>
    }catch({error:{message}}){
      console.log(message)
    }
  }

  leaveChannel = async(user_email:string,channel_id:string) => {
    try{
      return await this.http.delete(`${this.genericUrl}leave`,{headers:{user_email,channel_id},observe: 'response' }).toPromise() as HttpResponse<Object>
    }catch({error:{message}}){
      console.log(message);
    }
  }
}

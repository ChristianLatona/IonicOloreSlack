import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PopoverDataService {
    constructor() { }

    userEmail:string
    getUserEmail=()=>{
        return this.userEmail
    }
    setUserEmail=(userEmail)=>{
        this.userEmail=userEmail
    }

    channelId:string
    getChannelId=()=>{
        return this.channelId
    }
    setChannelId=(channelId)=>{
        this.channelId=channelId
    }
}

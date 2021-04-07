import { Component, OnInit,Input } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { PopoverDataService } from 'src/app/services/popoverData.service';

@Component({
  selector: 'app-leave-channel-popover',
  templateUrl: './leave-channel-popover.component.html',
  styleUrls: ['./leave-channel-popover.component.scss'],
})
export class LeaveChannelPopoverComponent {
  
  constructor(private popoverData:PopoverDataService,private channelService:ChannelService) { }
  userEmail:string
  channelId:string

  ngOnInit() {
    this.userEmail=this.popoverData.getUserEmail()
    this.channelId=this.popoverData.getChannelId()
  }

  leaveChannel=()=>{
    this.channelService.leaveChannel(this.userEmail,this.channelId)
  }

}


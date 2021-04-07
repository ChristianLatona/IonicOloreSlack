import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { CreateChannelModalComponent } from '../create-channel-modal/create-channel-modal.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspace_id:string;
  workspace_name:string;
  allChannels:{id:string, name:string}[] = [];
  channelsToShow:{id:string, name:string}[] = [];
  users:{email:string, username:string}[] = [];
  channelSelected:Boolean=false
  userEmail:string;

  constructor(
    private menu:MenuController, 
    private workspaceService:WorkspaceService, 
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private router:Router,
    private channelService: ChannelService,
    private authService: AuthService
    ) { }

  async ngOnInit() {
    this.workspace_id = sessionStorage.getItem("workspace_id");
    let userToken = sessionStorage.getItem("userTkn");
    let value;
    userToken && (value = await this.authService.getEmail(userToken))
    this.userEmail = value.message;
    await this.loadWorkspaceName();
    await this.loadChannels();
    this.setChannelsToShow();
    await this.loadUsers();
  }

  loadWorkspaceName = async() => {
    let data = await this.workspaceService.getWorkspaceName(this.workspace_id);
    let info:{name:string};
    if(data){
      info = data.body as {name:string}
    }
    this.workspace_name = info.name
  }

  loadChannels = async () => {
    let {body} = await this.workspaceService.getChannels(this.workspace_id)
    this.allChannels = body as {id:string, name:string}[]
  }

  setChannelsToShow = () => {
    this.allChannels.forEach(async (channel) => {
      let data = await this.channelService.getChannelPrivacy(channel.id);
      let {privacy} = data.body as {privacy:Boolean}
      if(privacy){
        let value = await this.checkIfInChannel(channel.id)
        if(!value){
          return
        }
      }
      this.channelsToShow.push(channel)
    })
  }

  loadUsers = async () => {
    let {body} = await this.workspaceService.getUsers(this.workspace_id)
    this.users = body as {email:string, username:string}[]
  }

  navigate = (selectedChannel:string) => {
    this.channelSelected=true
    this.router.navigateByUrl(`/channel/${selectedChannel}`);
    /*
      Usare il routerLink con il routerOutlet o usare il selector app-channel con EventEmitter?
    */
  }

  checkIfInChannel = async(channelId:string) => {
    let {body} = await this.channelService.getAllUsers(channelId);
    let users = body as String[];
    return users.includes(this.userEmail)
  }

  addChannel = async () => {
    const modal = await this.modalCtrl.create({
      component: CreateChannelModalComponent
    });

    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if(role === 'created'){
      console.log(data)//qui si richiama il service per la creazione del canale e si ricarica la pagina
      const alert = await this.alertCtrl.create({header: "Success", message: `Channel ${data.name} has been created`, buttons: ["Close"]});
      await alert.present();
    }
  }

  sendPrivateMessage = (receiverEmail:string) => {
    console.log("sendPrivateMessage", receiverEmail)
  } 

  openFirst() {
    this.menu.enable(true, 'main');
    this.menu.open('main');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}

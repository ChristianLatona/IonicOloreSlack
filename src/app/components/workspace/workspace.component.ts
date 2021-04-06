import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
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
  channels:{id:string, name:string}[] = [];
  users:{email:string, username:string}[] = [];

  channelSelected:Boolean=false
  constructor(
    private menu:MenuController, 
    private workspaceService:WorkspaceService, 
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private router:Router
    ) { }

  async ngOnInit() {
    this.workspace_id = sessionStorage.getItem("workspace_id");
    await this.loadWorkspaceName();
    await this.loadChannels();
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
    this.channels = body as {id:string, name:string}[]
  }

  loadUsers = async () => {
    let {body} = await this.workspaceService.getUsers(this.workspace_id)
    this.users = body as {email:string, username:string}[]
  }

  navigate = (selectedChannel:string) => {
    this.channelSelected=true
    this.router.navigateByUrl(`/channel/${selectedChannel}`);
  }

  addChannel = async () => {
    const modal = await this.modalCtrl.create({
      component: CreateChannelModalComponent
    });

    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if(role === 'created'){
      console.log(data)//qui si richiama il service per la creazione del canale
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

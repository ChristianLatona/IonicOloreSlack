import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { PopoverDataService } from 'src/app/services/popoverData.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { CreateChannelModalComponent } from '../create-channel-modal/create-channel-modal.component';
import { LeaveChannelPopoverComponent } from '../leave-channel-popover/leave-channel-popover.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspace_id:string = '';
  workspace_name:string = '';
  allChannels:{id:string, name:string}[] = [];
  channelsToShow:{id:string, name:string}[] = [];
  users:{email:string, username:string}[] = [];
  channelSelected:Boolean=false
  userEmail:string = '';
  userToken:string = '';
  channelId:string = '';

  constructor(
    private menu:MenuController, 
    private workspaceService:WorkspaceService, 
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private router:Router,
    private channelService: ChannelService,
    private authService: AuthService,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private popoverData: PopoverDataService
    ) { }

  async ngOnInit() {
    this.workspace_id = sessionStorage.getItem("workspace_id");
    this.userToken = sessionStorage.getItem("userTkn");
    let value = await this.authService.getEmail(this.userToken)
    if(value){
      this.userEmail = value.message;
    }
    await this.loadWorkspaceName();
    await this.loadChannels();
    this.setChannelsToShow();
    await this.loadUsers(); 
  }

  async ionViewDidEnter(){
    
  }

  loadWorkspaceName = async() => {
    let data = await this.workspaceService.getWorkspaceName(this.workspace_id);
    let info:{name:string};
    if(data){
      info = data.body as {name:string}
      if(info){
        this.workspace_name = info.name
      }
    }
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

    /* modal.onDidDismiss().then(async(value) => {
      let {data, role} = value;
      if(role == 'created'){
        let {name, privacy} = data;
        let privac:boolean = false;
        if(privacy == 'true'){
          privac = true;
        }
        this.workspaceService.createChannel(this.workspace_id, this.userToken, name, privac)
        const alert = await this.alertCtrl.create({header: "Success", message: `Channel ${data.name} has been created`, buttons: ["Close"]});
        await alert.present();
        this.ngOnInit();
      }
    }) */
    
    const {data, role} = await modal.onWillDismiss();
    if(role === 'created'){
      console.log(data)
      let {name, privacy} = data
      let privac:boolean = false;
      if(privacy == 'true'){
        privac = true;
      }
      this.workspaceService.createChannel(this.workspace_id, this.userToken, name, privac)
      const alert = await this.alertCtrl.create({header: "Success", message: `Channel ${data.name} has been created`, buttons: ["Close"]});
      await alert.present();
    }
  }

  async leaveChannelPopover(ev: any) {
    this.popoverData.setUserEmail(this.userEmail)
    this.popoverData.setChannelId(this.channelId)
    const popover = await this.popoverController.create({
      component: LeaveChannelPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });

    /* popover.onDidDismiss().then(() => {
      this.ngOnInit();
    }) */

    await popover.present();
    
  }

  async settingsActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Account',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete Account',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          await this.authService.deleteAccount(this.userToken)
          this.userToken = '';
          sessionStorage.removeItem("userTkn");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("workspace_id");
          this.router.navigate([""])
        }
      }, {
        text: 'Logout',
        icon: 'exit',
        handler: async () => {
          await this.authService.logout(this.userToken)
          sessionStorage.removeItem("userTkn");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("workspace_id");
          this.router.navigate([""])
        }
      }, {
        text: 'Leave Workspace',
        icon: 'arrow-undo-outline',
        handler: async () => {
          await this.workspaceService.leaveWorkspace(this.userToken,this.workspace_id)// 
          sessionStorage.removeItem("userTkn");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("workspace_id");
          this.router.navigate(["/home"])
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    console.log('puresento settingsActionSheet')
    await actionSheet.present();
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

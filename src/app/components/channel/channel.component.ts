import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { ShowUsersModalComponent } from '../show-users-modal/show-users-modal.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  workspace_id:string;
  channel_id: string;
  channel_name:string;
  userToken:string;
  userEmail:string;
  messagesList:any[];
  usersListWithUsername:{email:string, username:string}[] = [];
  usersList:any[];
  messageInput:string;
  constructor(
    private channelService: ChannelService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl:ModalController,
    private alertCtrl:AlertController
  ) {}

  async ngOnInit() {
    this.workspace_id = sessionStorage.getItem("workspace_id");
    this.route.params.subscribe(async (param) => {
      this.channel_id = param.id;
      let data = await  this.channelService.getChannelName(this.channel_id);
      data && (this.channel_name = data.body as string);

      sessionStorage.getItem("userTkn") && (this.userToken = sessionStorage.getItem("userTkn"));
      let {message} = await this.authService.getEmail(this.userToken);
      this.userEmail = message;
      
      let messages = await this.channelService.getAllMessages(this.channel_id); //Funziona
      this.messagesList = messages.body as any[]
      console.log(this.messagesList)

      await this.loadUser();
      //Da usare quando cicliamo la lista degli utenti per mostrare gli username invece delle email?
      /* let userUsername = await this.channelService.getUsername(this.usersList[0])
      console.log(userUsername.body) */ //Funziona 
    });
  }

  loadUser = async () => {
      let users = await this.channelService.getAllUsers(this.channel_id);//Funziona
      this.usersList = users.body as any[];
      this.getAllUsername();
  }

  addUserToChannel = async() =>{
    const modal = await this.modalCtrl.create({
      component: AddUserModalComponent
    });
    
    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if(role === 'added'){
      console.log(data)
      await this.channelService.addToChannel(data,this.channel_id,this.workspace_id);
      this.usersListWithUsername = [];
      this.loadUser();
    }
    
  }

  getAllUsername = () => {
    this.usersList.forEach(async(email) => {
      let {body} = await this.channelService.getUsername(email)
      this.usersListWithUsername.push({email, username: body as string})
    });
  }

  getUsername = (email:string) => {
    let user = this.usersListWithUsername.find(user => user.email === email);
    if(user){
      return user.username
    }
  }

  sendMessage = async() => {
    await this.channelService.createMessage(this.channel_id, this.userEmail, this.messageInput);
    this.messageInput = '';
    this.ngOnInit();
  }

  showUsers = async () => {
    const modal = await this.modalCtrl.create({
      component: ShowUsersModalComponent,
      cssClass: 'my-modal',
      componentProps: {
        usersList: this.usersListWithUsername
      }
    });

    return await modal.present();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll

      // if (messages.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}

import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnDestroy{
  username:string;
  userToken:string;
  workspacesList:{id:string, name:string}[] = []
  //purpleColor="rgb(156,3,177)"
  work_id:string//conservare qui l'id della workspace cliccata
  workspaceName:string

  constructor(public actionSheetController: ActionSheetController, private home:HomeService, private auth:AuthService, private router: Router) {}
  
  ngOnDestroy() {
    sessionStorage.removeItem("userTkn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("workspace_id");
  }
  
  async ngOnInit(){
    sessionStorage.getItem("userTkn") && (this.userToken = sessionStorage.getItem("userTkn"));
    sessionStorage.getItem("username") && (this.username = sessionStorage.getItem("username"));
    let {body} = await this.home.workspacesList(this.userToken);
    this.workspacesList = body as {id:string, name:string}[];
    console.log(this.workspacesList);
  }

  private navigate(path:string){
    this.router.navigate([`/${path}`])
  }

  enterWorkspace = (workspace_id:string) => {//Funziona
    sessionStorage.setItem("workspace_id", workspace_id);
    setTimeout(() => {
      this.navigate("workspace");
    }, 1500)
  }

  joinWorkspace = async () => {//Funziona
    const data = await this.home.joinWorkspace(this.userToken,this.work_id)
    if(typeof data != 'string'){
      let {status, body} = data//status, messaggio se ha joinato con successo
      console.log("HomeComponent riga 41", status, body)
      sessionStorage.setItem('workspace_id', this.work_id);
      setTimeout(() => {
        this.navigate("workspace");
      }, 2500)
    }else{//messaggio d'errore da gestire
      console.log("else join ", data)
    }
  }

  createWorkspace = async () => {//Funziona
    let  {status,body} = await this.home.createWorkspace(this.userToken,this.workspaceName)
    let workspace = body as {message:string, workspaceId:string}
    console.log("HomeComponent riga 48", status,body);
    if(status == 200){
      sessionStorage.setItem("workspace_id", workspace.workspaceId)
      setTimeout(() => {
        this.navigate("workspace");
      }, 2500)
    }
  }

  settingsActionSheet = async() => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Account',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete Account',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          await this.auth.deleteAccount(this.userToken)
          this.userToken = '';
          this.username = '';
          sessionStorage.removeItem("userTkn");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("workspace_id");
          this.navigate("")
        }
      }, {
        text: 'Logout',
        icon: 'exit',
        handler: async () => {
          await this.auth.logout(this.userToken)
          sessionStorage.removeItem("userTkn");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("workspace_id");
          this.navigate("")
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
    await actionSheet.present();
  }

  async workspacesActionSheet() {
    let buttonsList = []
    if(this.workspacesList.length > 0){
      this.workspacesList.forEach(workspace => {
        buttonsList.push({
          text: workspace.name,
          icon: '',
          role: '',
          handler: () => {
            this.enterWorkspace(workspace.id)
          }
        })
      })
    }
    buttonsList.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    })

    const actionSheet = await this.actionSheetController.create({
      header: 'Workspaces List',
      cssClass: 'my-custom-class',
      buttons: buttonsList
    });
    
    console.log(actionSheet.buttons)
    await actionSheet.present();
  }
}


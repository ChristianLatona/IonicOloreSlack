import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-users-modal',
  templateUrl: './show-users-modal.component.html',
  styleUrls: ['./show-users-modal.component.scss'],
})
export class ShowUsersModalComponent implements OnInit {
  @Input() usersList:{email:string, username:string}[]
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    
  }

  dismissModal = () => {
    this.modalCtrl.dismiss();
  }

}

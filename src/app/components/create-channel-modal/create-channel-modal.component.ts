import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-channel-modal',
  templateUrl: './create-channel-modal.component.html',
  styleUrls: ['./create-channel-modal.component.scss'],
})
export class CreateChannelModalComponent {
  channelName = new FormControl('', Validators.required)
  privacy = false;
  constructor(private modalCtrl:ModalController) { }


  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  create = () => {
    this.modalCtrl.dismiss({name: this.channelName.value, privacy: this.privacy}, 'created')
  }

}
